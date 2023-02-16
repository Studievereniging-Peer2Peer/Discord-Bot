import { InteractionResponse, SlashCommandBuilder } from 'discord.js';

export type Command = {
  data: SlashCommandBuilder;
  execute: (CommandInteraction) => Promise<void>;
};
