/*
  Warnings:

  - Added the required column `password` to the `Customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "password" TEXT NOT NULL;
