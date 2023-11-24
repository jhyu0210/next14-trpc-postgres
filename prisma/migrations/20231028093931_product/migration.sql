-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "businessArea" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udatedAt" TIMESTAMP(3) NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "mat" TEXT NOT NULL,
    "app" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_category_key" ON "Product"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Product_businessArea_key" ON "Product"("businessArea");
