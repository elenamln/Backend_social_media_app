/*
  Warnings:

  - You are about to drop the column `number` on the `Dislike` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dislike" DROP COLUMN "number";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "number";
