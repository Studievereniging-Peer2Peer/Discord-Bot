import {prisma} from '../client';
import {Client, EmbedBuilder, userMention} from 'discord.js';
import {Birthday} from '@prisma/client';
import {intervalToDuration} from 'date-fns';
import {EventType} from 'types';

const getBirthDays = async (date: Date = new Date()) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth();

  const birthdays =
    (await prisma.$queryRaw`SELECT * FROM "public"."Birthday" WHERE date_part('day', birthday) = ${day} AND date_part('month', birthday) = ${month}`) as
      | Birthday[]
      | undefined;

  if (!Array.isArray(birthdays)) return [];

  return birthdays;
};

const getNotificationChannel = async (eventType: EventType) => {
  return await prisma.notificationChannel.findFirst({
    where: {
      event: eventType,
    },
  });
};

export const sendBirthdayCongratulations = async (client: Client) => {
  const notificationChannel = await getNotificationChannel('birthday');

  // If no notification channel has been set, return early
  if (!notificationChannel) return;

  const birthdays = await getBirthDays();

  const channel = await client.channels.fetch(notificationChannel!.channelId);
  if (!channel?.isTextBased()) return;

  for (const birthday of birthdays) {
    const ageInYears = intervalToDuration({
      start: birthday.birthday,
      end: new Date(),
    }).years;

    const embed = new EmbedBuilder()
      .setColor(0x76b833)
      .setDescription(
        `:partying_face: Happy birthday to ${userMention(
          birthday.userId
        )!} who turned ${ageInYears} today`
      );

    channel.send({embeds: [embed]});
  }

  // console.log('Sent congratulations');
};
