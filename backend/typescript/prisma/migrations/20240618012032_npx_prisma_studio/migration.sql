/*
  Warnings:

  - You are about to drop the column `customerID` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "customerID",
ADD COLUMN     "customer_id" TEXT;
