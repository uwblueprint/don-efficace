-- CreateTable
CREATE TABLE "Onboarding" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "activation_code" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_email_key" ON "Onboarding"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_activation_code_key" ON "Onboarding"("activation_code");

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_user_id_key" ON "Onboarding"("user_id");
