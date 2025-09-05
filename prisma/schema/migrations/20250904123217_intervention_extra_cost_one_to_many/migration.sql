/*
  Warnings:

  - You are about to drop the `_extraCostIntervention` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `interventionId` to the `ExtraCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_extraCostIntervention" DROP CONSTRAINT "_extraCostIntervention_A_fkey";

-- DropForeignKey
ALTER TABLE "_extraCostIntervention" DROP CONSTRAINT "_extraCostIntervention_B_fkey";

-- AlterTable
ALTER TABLE "ExtraCost" ADD COLUMN     "interventionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_extraCostIntervention";

-- AddForeignKey
ALTER TABLE "ExtraCost" ADD CONSTRAINT "ExtraCost_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "Intervention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
