/*
  Warnings:

  - You are about to drop the column `car_id` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `Cars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_car_id_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "car_id";

-- DropTable
DROP TABLE "Cars";
