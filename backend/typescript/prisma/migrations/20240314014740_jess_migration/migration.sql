/*
  Warnings:

  - A unique constraint covering the columns `[npo_id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_id]` on the table `NPO` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `Cause` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cause" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "npo_id" INTEGER;

-- DropEnum
DROP TYPE "CauseEnum";

-- CreateIndex
CREATE UNIQUE INDEX "Item_npo_id_key" ON "Item"("npo_id");

-- CreateIndex
CREATE UNIQUE INDEX "NPO_item_id_key" ON "NPO"("item_id");
