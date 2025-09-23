-- CreateTable
CREATE TABLE "_InterventionExtraCostCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InterventionExtraCostCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InterventionExtraCostCategories_B_index" ON "_InterventionExtraCostCategories"("B");

-- AddForeignKey
ALTER TABLE "_InterventionExtraCostCategories" ADD CONSTRAINT "_InterventionExtraCostCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "ExtraCostCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterventionExtraCostCategories" ADD CONSTRAINT "_InterventionExtraCostCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Intervention"("id") ON DELETE CASCADE ON UPDATE CASCADE;
