import {executeInteractionAndSpyReply, getCommandData} from './testutils';
import {PingCommand} from '../src/commands/ping';

describe('PingCommand', () => {
  it('replies with pong', async () => {
    const command = getCommandData('ping');
    const spy = await executeInteractionAndSpyReply(PingCommand, command);

    expect(spy).toHaveBeenCalledWith('Pong!');
  });
});
