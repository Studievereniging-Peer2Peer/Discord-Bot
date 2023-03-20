import {prisma} from '../client';
import {CommandInteraction, SlashCommandBuilder} from 'discord.js';
import {Command} from '../types';
import {parse, isValid} from 'date-fns';

/*
 * Set the user's birthday
 */
export const SetCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Stelt jouw verjaardag in volgens DD-MM-YYYY formaat')
    .addStringOption(option =>
      option
        .setName('birthday')
        .setDescription('Your birthday')
        .setRequired(true)
    ) as SlashCommandBuilder,
  async execute(interaction: CommandInteraction) {
    const birthday = parse(
      interaction.options.get('birthday')!.value as string,
      'dd-MM-yyyy',
      new Date()
    );

    if (!isValid(birthday)) {
      await interaction.reply({
        content: 'Zet je verjaardag alsjeblieft in DD-MM-YYYY formaat',
        ephemeral: true,
      });
      return;
    }

    await prisma.birthday.create({
      data: {
        birthday,
        userId: interaction.user.id,
      },
    });

    await interaction.reply({
      content: 'Je verjaardag is ingesteld!',
      ephemeral: true,
    });
  },
};
