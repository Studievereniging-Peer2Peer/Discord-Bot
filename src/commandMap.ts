import path from 'path';
import fs from 'fs';
import {Collection} from 'discord.js';
import {Command} from './types';

export const commands = new Collection<string, Command>();

export const loadCommands = async () => {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'));

  for (const commandFile of commandFiles) {
    const filePath = path.join(commandsPath, commandFile);
    const commandImport = await import(filePath);
    const commandName = Object.keys(commandImport)[0];
    const command = commandImport[commandName] as Command;

    if ('data' in command && 'execute' in command) {
      commands.set(command.data.name, command);
    }
  }
};
