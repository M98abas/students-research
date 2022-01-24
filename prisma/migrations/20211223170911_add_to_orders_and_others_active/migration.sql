-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Order_datels" ALTER COLUMN "discount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
