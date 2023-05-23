/*
  Warnings:

  - You are about to drop the column `activitiesId` on the `Inscription` table. All the data in the column will be lost.
  - You are about to drop the `Activities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ActivityId` to the `Inscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_activitiesId_fkey";

-- AlterTable
ALTER TABLE "Inscription" DROP COLUMN "activitiesId",
ADD COLUMN     "ActivityId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Activities";

-- CreateTable
CREATE TABLE "Auditory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Auditory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "auditoryId" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Activity_startAt_idx" ON "Activity"("startAt");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_auditoryId_fkey" FOREIGN KEY ("auditoryId") REFERENCES "Auditory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_ActivityId_fkey" FOREIGN KEY ("ActivityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
