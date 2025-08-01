/*
  Warnings:

  - You are about to drop the column `interventionId` on the `ExtraCost` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExtraCost" DROP CONSTRAINT "ExtraCost_interventionId_fkey";

-- AlterTable
ALTER TABLE "ExtraCost" DROP COLUMN "interventionId";

-- CreateTable
CREATE TABLE "_extraCostIntervention" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_extraCostIntervention_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_extraCostIntervention_B_index" ON "_extraCostIntervention"("B");

-- AddForeignKey
ALTER TABLE "_extraCostIntervention" ADD CONSTRAINT "_extraCostIntervention_A_fkey" FOREIGN KEY ("A") REFERENCES "ExtraCost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_extraCostIntervention" ADD CONSTRAINT "_extraCostIntervention_B_fkey" FOREIGN KEY ("B") REFERENCES "Intervention"("id") ON DELETE CASCADE ON UPDATE CASCADE;
