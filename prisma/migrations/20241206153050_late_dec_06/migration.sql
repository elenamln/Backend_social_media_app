/*
  Warnings:

  - Made the column `emailToken` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "emailToken" SET NOT NULL;
