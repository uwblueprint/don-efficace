/*
  Warnings:

  - You are about to drop the column `donation_id` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_id` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "payment_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "donation_id";

-- CreateIndex
CREATE UNIQUE INDEX "Donation_payment_id_key" ON "Donation"("payment_id");
