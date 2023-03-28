import {
  APIApplicationCommandOption,
  Channel,
  CommandInteraction,
} from 'discord.js';
import {Command} from 'types';
import MockDiscord from './mockDiscord';
export default MockDiscord;

type CommandName = 'ping' | 'notificationChannel' | 'set';

type Option = (
  name: string,
  value: string,
  channel?: Channel
) => APIApplicationCommandOption;

export const option: Option = (name, value) => ({
  name,
  id: name,
  value,
  type: 3,
  description: '',
});

export const getCommandData: (
  commandName: CommandName,
  ...optionData: APIApplicationCommandOption[]
) => {name: string} = (commandName, ...optionData) => {
  const command = {
    id: commandName,
    name: commandName,
    type: 1,
    options: [] as APIApplicationCommandOption[],
  };

  if (optionData) {
    command.options = optionData;
  }

  return command;
};

export const executeInteractionAndSpyReply = async (
  command: Command,
  content: {name: string}
) => {
  const discord = new MockDiscord({command: content});
  const interaction = discord.getInteraction() as CommandInteraction;
  const spy = jest.spyOn(interaction, 'reply');
  await command.execute(interaction);
  return spy;
};
