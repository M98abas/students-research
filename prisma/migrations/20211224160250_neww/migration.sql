-- AlterTable
ALTER TABLE "Order_datels" ALTER COLUMN "total_cost" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "discount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
