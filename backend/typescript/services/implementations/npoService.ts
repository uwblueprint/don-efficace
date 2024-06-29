import INpoService from "../interfaces/INpoService";
import { NpoDTO } from "../../types";
import prisma from "../../prisma";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

class NpoService implements INpoService {
  getAllNPOs = async (): Promise<NpoDTO[]> => {
    try {
      const allNPOs = await prisma.nPO.findMany();

      return allNPOs;
    } catch (error) {
      Logger.error(
        `Error fetching all NPOs. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  };

  getNPOById = async (npoId: string): Promise<NpoDTO> => {
    try {
      const npo = await prisma.nPO.findUnique({
        where: {
          id: parseInt(npoId),
        },
      });

      if (!npo) {
        throw new Error(`NPO with ID ${npoId} not found`);
      }

      return npo;
    } catch (error) {
      Logger.error(
        `Error fetching NPO with ID ${npoId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  };

  createNPO = async (
    npo_id: string,
    name: string,
    cause: string,
    item_id: number,
  ): Promise<NpoDTO> => {
    try {
      const newNPO = await prisma.nPO.create({
        data: {
          npo_id,
          name,
          cause,
          item_id,
        },
      });
      // export type CauseUpdateOneRequiredWithoutNposNestedInput = {
      //   create?: XOR<CauseCreateWithoutNposInput, CauseUncheckedCreateWithoutNposInput>
      //   connectOrCreate?: CauseCreateOrConnectWithoutNposInput
      //   upsert?: CauseUpsertWithoutNposInput
      //   connect?: CauseWhereUniqueInput
      //   update?: XOR<XOR<CauseUpdateToOneWithWhereWithoutNposInput, CauseUpdateWithoutNposInput>, CauseUncheckedUpdateWithoutNposInput>
      // }
      return newNPO;
    } catch (error) {
      Logger.error(
        `Error creating NPO ${name}. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  };

  updateNPO = async (
    npo_id: string,
    name: string,
    cause: string,
    item_id: number,
  ): Promise<NpoDTO> => {
    try {
      const updatedNPO = await prisma.nPO.update({
        where: {
          id: parseInt(npo_id),
        },
        data: {
          npo_id,
          name,
          cause,
          item_id,
        },
      });

      return updatedNPO;
    } catch (error) {
      Logger.error(
        `Error updating NPO with ID ${npo_id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  };

  deleteNPO = async (npoId: string): Promise<boolean> => {
    try {
      const deleteResult = await prisma.nPO.delete({
        where: {
          id: parseInt(npoId),
        },
      });

      return !!deleteResult;
    } catch (error) {
      Logger.error(
        `Error deleting NPO with ID ${npoId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  };
}

export default NpoService;
