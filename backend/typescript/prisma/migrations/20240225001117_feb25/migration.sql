-- CreateEnum
CREATE TYPE "CauseEnum" AS ENUM ('ENVIRONMENT', 'EDUCATION', 'HEALTH');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "full_addr" TEXT NOT NULL,
    "email_addr" TEXT NOT NULL,
    "opt_in" BOOLEAN NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "donation_date" TIMESTAMP(3) NOT NULL,
    "is_recurring" BOOLEAN NOT NULL,
    "confirmation_email_sent" BOOLEAN NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauseDonation" (
    "donation_id" INTEGER NOT NULL,
    "cause_id" INTEGER NOT NULL,

    CONSTRAINT "CauseDonation_pkey" PRIMARY KEY ("donation_id","cause_id")
);

-- CreateTable
CREATE TABLE "Cause" (
    "id" SERIAL NOT NULL,
    "name" "CauseEnum" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Cause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NPO" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_information" TEXT NOT NULL,
    "cause_id" INTEGER NOT NULL,
    "item_id" INTEGER,

    CONSTRAINT "NPO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "impact_ratio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_addr_key" ON "User"("email_addr");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseDonation" ADD CONSTRAINT "CauseDonation_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseDonation" ADD CONSTRAINT "CauseDonation_cause_id_fkey" FOREIGN KEY ("cause_id") REFERENCES "Cause"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NPO" ADD CONSTRAINT "NPO_cause_id_fkey" FOREIGN KEY ("cause_id") REFERENCES "Cause"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NPO" ADD CONSTRAINT "NPO_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
