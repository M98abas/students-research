/*
  Warnings:

  - Added the required column `discount` to the `Order_datels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order_datels" ADD COLUMN     "discount" INTEGER NOT NULL;
