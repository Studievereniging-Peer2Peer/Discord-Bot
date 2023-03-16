-- CreateTable
CREATE TABLE "NotificationChannel" (
    "id" SERIAL NOT NULL,
    "channel" VARCHAR(255) NOT NULL,
    "event" VARCHAR(255) NOT NULL,

    CONSTRAINT "NotificationChannel_pkey" PRIMARY KEY ("id")
);
