import {CommandInteraction} from 'discord.js';
import MockDiscord from './testutils';
import {PingCommand} from '../src/commands/ping';

describe('PingCommand', () => {
  it('replies with pong', async () => {
    const command = {
      commandName: 'ping',
    };
    const discord = new MockDiscord({command});
    const interaction = discord.getInteraction() as CommandInteraction;
    await PingCommand.execute(interaction);
    const spy = jest.spyOn(interaction, 'reply');

    expect(spy).toHaveBeenCalledWith('Pong!');
  });
});
