import {CommandInteraction, SlashCommandBuilder} from 'discord.js';
import {Command} from '../types';

export const PingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  },
};
