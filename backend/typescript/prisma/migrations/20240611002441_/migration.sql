/*
  Warnings:

  - You are about to drop the column `donation_id` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "payment_id" INTEGER;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "donation_id",
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Donation_payment_id_key" ON "Donation"("payment_id");
