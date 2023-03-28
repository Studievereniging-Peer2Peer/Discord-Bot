/*
  Warnings:

  - A unique constraint covering the columns `[event]` on the table `NotificationChannel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NotificationChannel_event_key" ON "NotificationChannel"("event");
