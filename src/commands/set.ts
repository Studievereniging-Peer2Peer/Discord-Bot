import {prisma} from '../client';
import {CommandInteraction, SlashCommandBuilder} from 'discord.js';
import {Command} from '../types';
import {parse, isValid} from 'date-fns';

export const SetCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Sets your birthday in (DD-MM-YYYY) format')
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
        content: 'Please set your birthday in the DD-MM-YYYY format',
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
      content: 'Birthday set!',
      ephemeral: true,
    });
  },
};
