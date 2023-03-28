import {
  option,
  executeInteractionAndSpyReply,
  getCommandData,
} from './testutils';
import {NotificationChannelCommand} from '../src/commands/notificationChannel';

describe('NotificationChannelCommand', () => {
  it('it sets the notification channel for birthdays', async () => {
    const command = getCommandData(
      'notificationChannel',
      option('type', 'birthday'),
      option('channel', 'test')
    );

    const spy = await executeInteractionAndSpyReply(
      NotificationChannelCommand,
      command
    );

    expect(spy).toHaveBeenCalledWith({
      content: 'Kanaal <#test> ingesteld voor meldingen van type birthday',
      ephemeral: true,
    });
  });
});
