/*
  Warnings:

  - You are about to drop the column `images` on the `Categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "images",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT E'';
