-- CreateTable
CREATE TABLE "Dislike" (
    "messageId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Dislike_pkey" PRIMARY KEY ("messageId","userId")
);

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
