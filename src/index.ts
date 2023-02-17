import dotenv from 'dotenv';
import {Client, Events, GatewayIntentBits} from 'discord.js';
import {commands, loadCommands} from './commandMap';
import {registerCommands} from './registerCommands';
import {Command} from './types';
import {handleCommand} from './commandHandler';

// Load environment variables
dotenv.config();

(async () => {
  const client = new Client({intents: [GatewayIntentBits.Guilds]});

  await loadCommands();

  client.on(
    'ready',
    async () =>
      await registerCommands(
        commands.reduce((acc, command) => [...acc, command], [] as Command[])
      )
  );

  client.on(
    Events.InteractionCreate,
    async interaction => await handleCommand(interaction)
  );

  client.login(process.env.DISCORD_TOKEN);
})();
