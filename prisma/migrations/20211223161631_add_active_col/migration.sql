-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
