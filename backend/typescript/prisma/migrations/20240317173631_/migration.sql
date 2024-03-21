/*
  Warnings:

  - You are about to drop the `CauseDonation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CauseDonation" DROP CONSTRAINT "CauseDonation_cause_id_fkey";

-- DropForeignKey
ALTER TABLE "CauseDonation" DROP CONSTRAINT "CauseDonation_donation_id_fkey";

-- DropTable
DROP TABLE "CauseDonation";

-- CreateTable
CREATE TABLE "_CauseToDonation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CauseToDonation_AB_unique" ON "_CauseToDonation"("A", "B");

-- CreateIndex
CREATE INDEX "_CauseToDonation_B_index" ON "_CauseToDonation"("B");

-- AddForeignKey
ALTER TABLE "_CauseToDonation" ADD CONSTRAINT "_CauseToDonation_A_fkey" FOREIGN KEY ("A") REFERENCES "Cause"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CauseToDonation" ADD CONSTRAINT "_CauseToDonation_B_fkey" FOREIGN KEY ("B") REFERENCES "Donation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
