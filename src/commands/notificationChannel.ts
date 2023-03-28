import {prisma} from '../client';
import {
  channelMention,
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';
import {Command} from '../types';

/*
 * Set channel for a given type of notifications
 */
export const NotificationChannelCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('notification_channel')
    .setDescription('Sets the channel for the notifications')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('The type of event')
        .setRequired(true)
        .addChoices({
          name: 'Birthday',
          value: 'birthday',
        })
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription(
          'Het kanaal waar de notificatie in geplaatst moet worden'
        )
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: CommandInteraction) {
    const typeData = interaction.options.get('type') as {value: string};
    const channelData = interaction.options.get('channel') as {
      channel: TextChannel;
    };

    await prisma.notificationChannel.upsert({
      where: {
        event: typeData.value,
      },
      create: {
        event: typeData.value,
        channelId: channelData.channel.id,
        guildId: channelData.channel.guildId,
      },
      update: {
        channelId: channelData.channel.id,
        guildId: channelData.channel.guildId,
      },
    });

    await interaction.reply({
      content: `Kanaal ${channelMention(
        channelData.channel.id
      )} ingesteld voor meldingen van type ${typeData.value}`,
      ephemeral: true,
    });
  },
};
