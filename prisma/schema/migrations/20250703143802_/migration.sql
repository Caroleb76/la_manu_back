/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `SessionFormation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SessionFormation_serialNumber_key" ON "SessionFormation"("serialNumber");
