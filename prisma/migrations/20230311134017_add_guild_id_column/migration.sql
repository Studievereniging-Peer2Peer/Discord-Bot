/*
  Warnings:

  - You are about to drop the column `channel` on the `NotificationChannel` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `NotificationChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `NotificationChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationChannel" DROP COLUMN "channel",
ADD COLUMN     "channelId" VARCHAR(255) NOT NULL,
ADD COLUMN     "guildId" VARCHAR(255) NOT NULL;
