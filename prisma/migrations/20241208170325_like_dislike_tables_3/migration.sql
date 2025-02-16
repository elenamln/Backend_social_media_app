/*
  Warnings:

  - Added the required column `number` to the `Dislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dislike" ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "number" INTEGER NOT NULL;
