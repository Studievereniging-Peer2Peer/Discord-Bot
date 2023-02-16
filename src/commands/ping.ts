import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../typings';

const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  },
};

export default pingCommand;
