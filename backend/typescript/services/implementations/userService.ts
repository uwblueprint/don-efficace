import { Prisma } from "@prisma/client";
import * as firebaseAdmin from "firebase-admin";
import { size } from "lodash";
import IUserService from "../interfaces/userService";
import { CreateUserDTO, Role, UpdateUserDTO, UserDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import User from "../../models/user.model";
import prisma from "../../prisma";

const Logger = logger(__filename);

class UserService implements IUserService {
  /* eslint-disable class-methods-use-this */

  async getUserById(userId: string): Promise<UserDTO> {
    let user: Prisma.UserCreateInput | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      user = await prisma.user.findUnique({
        where: {
          id: String(userId),
        },
      });

      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }
      firebaseUser = await firebaseAdmin.auth().getUser(user.auth_id);
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: String(user.id),
      firstName: user.first_name,
      lastName: user.last_name,
      email: firebaseUser.email ?? "",
      role: user.role,
    };
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    let user: Prisma.UserCreateInput | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);

      user = await prisma.user.findFirst({
        where: {
          auth_id: firebaseUser.uid,
        },
      });

      if (!user) {
        throw new Error(`userId with authID ${firebaseUser.uid} not found.`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: String(user.id),
      firstName: user.first_name,
      lastName: user.last_name,
      email: firebaseUser.email ?? "",
      role: user.role,
    };
  }

  async getUserRoleByAuthId(authId: string): Promise<Role> {
    try {
      const user: Prisma.UserCreateInput | null = await prisma.user.findFirst({
        where: {
          auth_id: authId,
        },
      });
      if (!user) {
        throw new Error(`userId with authId ${authId} not found.`);
      }
      return user.role;
    } catch (error: unknown) {
      Logger.error(
        `Failed to get user role. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getUserIdByAuthId(authId: string): Promise<string> {
    try {
      const user: Prisma.UserCreateInput | null = await prisma.user.findFirst({
        where: {
          auth_id: authId,
        },
      });
      if (!user) {
        throw new Error(`user with authId ${authId} not found.`);
      }
      return String(user.id);
    } catch (error: unknown) {
      Logger.error(`Failed to get user id. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getAuthIdById(userId: string): Promise<string> {
    try {
      const user: Prisma.UserCreateInput | null = await prisma.user.findUnique({
        where: {
          id: String(userId),
        },
      });
      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }
      return user.auth_id;
    } catch (error: unknown) {
      Logger.error(`Failed to get authId. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getUsers(): Promise<Array<UserDTO>> {
    let userDtos: Array<UserDTO> = [];
    try {
      const users: Array<Prisma.UserCreateInput> = await prisma.user.findMany();

      userDtos = await Promise.all(
        users.map(async (user) => {
          let firebaseUser: firebaseAdmin.auth.UserRecord;

          try {
            firebaseUser = await firebaseAdmin.auth().getUser(user.auth_id);
          } catch (error) {
            Logger.error(
              `user with authId ${user.auth_id} could not be fetched from Firebase`,
            );
            throw error;
          }

          return {
            id: String(user.id),
            firstName: user.first_name,
            lastName: user.last_name,
            email: firebaseUser.email ?? "",
            role: user.role,
          };
        }),
      );
    } catch (error: unknown) {
      Logger.error(`Failed to get users. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return userDtos;
  }

  async createUser(
    user: CreateUserDTO,
    authId?: string,
    signUpMethod = "PASSWORD",
  ): Promise<UserDTO> {
    let newUser: Prisma.UserCreateInput;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      if (signUpMethod === "GOOGLE") {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        firebaseUser = await firebaseAdmin.auth().getUser(authId!);
      } else {
        // signUpMethod === PASSWORD
        firebaseUser = await firebaseAdmin.auth().createUser({
          email: user.email,
          password: user.password,
        });
      }

      if (!user.firstName || !user.lastName) {
        throw new Error('Missing required user fields for update');
      }

      try {
        newUser = await prisma.user.create({
          data: {
            first_name: user.firstName ?? 'Unknown',
            last_name: user.lastName ?? 'Unknown',
            auth_id: firebaseUser.uid,
            role: user.role,
          },
        });
      } catch (postgresError) {
        try {
          await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
        } catch (firebaseError: unknown) {
          const errorMessage = [
            "Failed to rollback Firebase user creation after Postgres user creation failure. Reason =",
            getErrorMessage(firebaseError),
            "Orphaned authId (Firebase uid) =",
            firebaseUser.uid,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw postgresError;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to create user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: String(newUser.id),
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: firebaseUser.email ?? "",
      role: newUser.role as Role,
    };
  }

  async updateUserById(userId: string, user: UpdateUserDTO): Promise<UserDTO> {
    let updatedFirebaseUser: firebaseAdmin.auth.UserRecord;

    if (!user.firstName || !user.lastName) {
      throw new Error('Missing required user fields for update');
    }

    try {
      const updateResult = await prisma.user.update({
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          role: user.role,
        },
        where: { id: userId },
      });

      // check number of rows affected
      if (size(updateResult) < 1) {
        throw new Error(`userId ${userId} not found.`);
      }

      // the cast to "any" is needed due to a missing property in the Sequelize type definitions
      // https://github.com/sequelize/sequelize/issues/9978#issuecomment-426342219
      /* eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any */
      const oldUser: Prisma.UserCreateInput = updateResult;

      try {
        updatedFirebaseUser = await firebaseAdmin
          .auth()
          .updateUser(oldUser.auth_id, { email: user.email });
      } catch (error) {
        // rollback Postgres user updates
        try {
          await prisma.user.update({
            data: {
              first_name: oldUser.first_name,
              last_name: oldUser.last_name,
              role: oldUser.role,
            },
            where: { id: userId },
          });
        } catch (postgresError: unknown) {
          const errorMessage = [
            "Failed to rollback Postgres user update after Firebase user update failure. Reason =",
            getErrorMessage(postgresError),
            "Postgres user id with possibly inconsistent data =",
            oldUser.id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to update user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: updatedFirebaseUser.email ?? "",
      role: user.role,
    };
  }

  async deleteUserById(userId: string): Promise<void> {
    try {
      // Sequelize doesn't provide a way to atomically find, delete, and return deleted row
      const deletedUser: Prisma.UserCreateInput | null =
        await prisma.user.findUnique({
          where: {
            id: String(userId),
          },
        });

      if (!deletedUser) {
        throw new Error(`userid ${userId} not found.`);
      }

      const numDestroyed: number = await User.destroy({
        where: { id: userId },
      });

      if (numDestroyed <= 0) {
        throw new Error(`userid ${userId} was not deleted in Postgres.`);
      }

      try {
        await firebaseAdmin.auth().deleteUser(deletedUser.auth_id);
      } catch (error) {
        // rollback user deletion in Postgres
        try {
          await prisma.user.create({
            data: {
              first_name: deletedUser.first_name,
              last_name: deletedUser.last_name,
              auth_id: deletedUser.auth_id,
              role: deletedUser.role,
            },
          });
        } catch (postgresError: unknown) {
          const errorMessage = [
            "Failed to rollback Postgres user deletion after Firebase user deletion failure. Reason =",
            getErrorMessage(postgresError),
            "Firebase uid with non-existent Postgres record =",
            deletedUser.auth_id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to delete user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async deleteUserByEmail(email: string): Promise<void> {
    try {
      const firebaseUser: firebaseAdmin.auth.UserRecord = await firebaseAdmin
        .auth()
        .getUserByEmail(email);
      const deletedUser: Prisma.UserCreateInput | null =
        await prisma.user.findFirst({
          where: {
            auth_id: firebaseUser.uid,
          },
        });

      if (!deletedUser) {
        throw new Error(`userid ${firebaseUser.uid} not found.`);
      }

      const numDestroyed = await prisma.user.deleteMany({
        where: { auth_id: firebaseUser.uid },
      });

      if (size(numDestroyed) <= 0) {
        throw new Error(
          `userid ${firebaseUser.uid} was not deleted in Postgres.`,
        );
      }

      try {
        await firebaseAdmin.auth().deleteUser(deletedUser.auth_id);
      } catch (error) {
        // rollback user deletion in Postgres
        try {
          await prisma.user.create({
            data: {
              first_name: deletedUser.first_name,
              last_name: deletedUser.last_name,
              auth_id: deletedUser.auth_id,
              role: deletedUser.role,
            },
          });
        } catch (postgresError: unknown) {
          const errorMessage = [
            "Failed to rollback Postgres user deletion after Firebase user deletion failure. Reason =",
            getErrorMessage(postgresError),
            "Firebase uid with non-existent Postgres record =",
            deletedUser.auth_id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to delete user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default UserService;
