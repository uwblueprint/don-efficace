import { DateDataType, FloatDataType, IntegerDataType } from "sequelize";

export type Role = "User" | "Admin";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role">;

export type AuthDTO = Token & UserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};

export type SignUpMethod = "PASSWORD" | "GOOGLE";

export type Recurrence = "None" | "Weekly" | "Monthly" | "Annually";

export type DonationDTO = {
  user_id: string;
  amount: number;
  donation_date: Date;
  cause_id: number;
  is_recurring: Recurrence;
  confirmation_email_sent: boolean;
};

export type CreateDonationDTO = Omit<DonationDTO, "user_id">;

export type ImpactDTO = {
  cause_id: number;
  cause_name: string;
  items: {
    item_id: number;
    item_name: string;
    total_impact: number;
  }[];
};
