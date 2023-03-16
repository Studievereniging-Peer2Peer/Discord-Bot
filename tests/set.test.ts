import {
  executeInteractionAndSpyReply,
  getCommandData,
  option,
} from './testutils';
import {SetCommand} from '../src/commands/set';

describe('NotificationChannelCommand', () => {
  it('it sets the birthday on valid date', async () => {
    const command = getCommandData('set', option('birthday', '12-12-2022'));

    const spy = await executeInteractionAndSpyReply(SetCommand, command);

    expect(spy).toHaveBeenCalledWith({
      content: 'Birthday set!',
      ephemeral: true,
    });
  });

  it("it doesn't set the birthday on invalid date", async () => {
    const command = getCommandData('set', option('birthday', '12-13-2022'));

    const spy = await executeInteractionAndSpyReply(SetCommand, command);

    expect(spy).toHaveBeenCalledWith({
      content: 'Please set your birthday in the DD-MM-YYYY format',
      ephemeral: true,
    });
  });
});
