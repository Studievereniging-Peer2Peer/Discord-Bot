import {REST, Routes} from 'discord.js';
import {Command} from './types';

export const registerCommands = async (commands: Command[]) => {
  try {
    const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN!);

    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const commandData = commands.map(command => command.data.toJSON());

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      {
        body: commandData,
      }
    )) as {length: number};

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};
