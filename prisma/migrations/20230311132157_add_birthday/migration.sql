-- CreateTable
CREATE TABLE "Birthday" (
    "id" SERIAL NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Birthday_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Birthday_userId_key" ON "Birthday"("userId");
