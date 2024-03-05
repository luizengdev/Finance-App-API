-- CreateEnum
CREATE TYPE "TransationType" AS ENUM ('EARNING', 'EXPENSE', 'INVESTIMENT');

-- CreateTable
CREATE TABLE "Transation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "date" DATE NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "type" "TransationType" NOT NULL,

    CONSTRAINT "Transation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transation" ADD CONSTRAINT "Transation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
