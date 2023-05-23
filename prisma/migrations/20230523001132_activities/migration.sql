-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivitiesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToUser_AB_unique" ON "_ActivitiesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToUser_B_index" ON "_ActivitiesToUser"("B");

-- AddForeignKey
ALTER TABLE "_ActivitiesToUser" ADD CONSTRAINT "_ActivitiesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToUser" ADD CONSTRAINT "_ActivitiesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
