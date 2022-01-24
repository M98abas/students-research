/*
  Warnings:

  - You are about to drop the column `order_id` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_order_id_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "order_id";

-- CreateTable
CREATE TABLE "Order_datels" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "total_cost" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Order_datels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order_datels" ADD CONSTRAINT "Order_datels_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_datels" ADD CONSTRAINT "Order_datels_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
