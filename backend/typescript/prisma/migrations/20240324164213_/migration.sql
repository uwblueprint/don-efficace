-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('Admin', 'User');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "auth_id" TEXT NOT NULL,
    "full_addr" TEXT,
    "opt_in" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "role" "RoleType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
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
    "name" TEXT NOT NULL,
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
    "npo_id" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_user_id_key" ON "Donation"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "NPO_item_id_key" ON "NPO"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_npo_id_key" ON "Item"("npo_id");
