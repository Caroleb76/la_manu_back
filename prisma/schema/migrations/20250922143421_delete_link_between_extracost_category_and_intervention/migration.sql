/*
  Warnings:

  - You are about to drop the `_InterventionExtraCostCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InterventionExtraCostCategories" DROP CONSTRAINT "_InterventionExtraCostCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterventionExtraCostCategories" DROP CONSTRAINT "_InterventionExtraCostCategories_B_fkey";

-- DropTable
DROP TABLE "_InterventionExtraCostCategories";
