/*
  Warnings:

  - You are about to drop the column `isexpired` on the `Message` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "isexpired",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
