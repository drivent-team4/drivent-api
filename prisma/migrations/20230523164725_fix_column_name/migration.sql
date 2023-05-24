/*
  Warnings:

  - You are about to drop the column `ActivityId` on the `Inscription` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `Inscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_ActivityId_fkey";

-- AlterTable
ALTER TABLE "Inscription" DROP COLUMN "ActivityId",
ADD COLUMN     "activityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
