import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../types";

@Table({ tableName: "User" })
export default class User extends Model {
  @Column({ type: DataType.STRING })
  first_name!: string;

  @Column({ type: DataType.STRING })
  last_name!: string;

  @Column({ type: DataType.STRING })
  auth_id!: string;

  @Column({ type: DataType.ENUM("User", "Admin") })
  role!: Role;

  // Optional customer_id column for Stripe customer ids
  @Column({ type: DataType.STRING, allowNull: true })
  customer_id?: string;
}
