/*
  Warnings:

  - You are about to drop the column `impression` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `num_dislike` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `num_like` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "impression",
DROP COLUMN "num_dislike",
DROP COLUMN "num_like";

-- CreateTable
CREATE TABLE "Like" (
    "messageId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("messageId","userId")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
