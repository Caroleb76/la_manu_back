/*
  Warnings:

  - Added the required column `formationId` to the `ModuleFormation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModuleFormation" ADD COLUMN     "formationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ModuleFormation" ADD CONSTRAINT "ModuleFormation_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
