/*
  Warnings:

  - A unique constraint covering the columns `[githubEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubEmail" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubEmail_key" ON "User"("githubEmail");
