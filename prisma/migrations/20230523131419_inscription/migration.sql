/*
  Warnings:

  - You are about to drop the `_ActivitiesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActivitiesToUser" DROP CONSTRAINT "_ActivitiesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivitiesToUser" DROP CONSTRAINT "_ActivitiesToUser_B_fkey";

-- DropTable
DROP TABLE "_ActivitiesToUser";

-- CreateTable
CREATE TABLE "Inscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activitiesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
