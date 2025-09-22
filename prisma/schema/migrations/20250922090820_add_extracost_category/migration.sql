/*
  Warnings:

  - You are about to drop the column `category` on the `ExtraCost` table. All the data in the column will be lost.
  - You are about to drop the `_extraCostIntervention` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `ExtraCost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interventionId` to the `ExtraCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_extraCostIntervention" DROP CONSTRAINT "_extraCostIntervention_A_fkey";

-- DropForeignKey
ALTER TABLE "_extraCostIntervention" DROP CONSTRAINT "_extraCostIntervention_B_fkey";

-- AlterTable
ALTER TABLE "ExtraCost" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "interventionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_extraCostIntervention";

-- CreateTable
CREATE TABLE "ExtraCostCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExtraCostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExtraCostCategory_name_key" ON "ExtraCostCategory"("name");

-- CreateIndex
CREATE INDEX "ExtraCost_categoryId_idx" ON "ExtraCost"("categoryId");

-- AddForeignKey
ALTER TABLE "ExtraCost" ADD CONSTRAINT "ExtraCost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExtraCostCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraCost" ADD CONSTRAINT "ExtraCost_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "Intervention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
