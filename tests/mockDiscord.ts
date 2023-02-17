import {Client, CommandInteraction, Guild, GuildMember, User} from 'discord.js';

export default class MockDiscord {
  public client!: Client;
  public guild!: Guild;
  public user!: User;
  public guildMember!: GuildMember;
  public interaction!: CommandInteraction;

  constructor(options: {command?: {commandName: string}}) {
    this.mockClient();
    this.mockGuild();
    this.mockUser();

    this.mockGuildMember();
    this.mockInteraction(options?.command);
  }

  public getClient(): Client {
    return this.client;
  }

  public getGuildMember(): GuildMember {
    return this.guildMember;
  }

  public getInteraction(): CommandInteraction {
    return this.interaction;
  }

  private mockClient(): void {
    this.client = new Client({intents: []});
  }

  mockGuild() {
    this.guild = Reflect.construct(Guild, [
      this.client,
      {
        unavailable: false,
        id: 'guild-id',
        name: 'mocked js guild',
        icon: 'mocked guild icon url',
        splash: 'mocked guild splash url',
        region: 'eu-west',
        member_count: 42,
        large: false,
        features: [],
        application_id: 'application-id',
        afkTimeout: 1000,
        afk_channel_id: 'afk-channel-id',
        system_channel_id: 'system-channel-id',
        embed_enabled: true,
        verification_level: 2,
        explicit_content_filter: 3,
        mfa_level: 8,
        joined_at: new Date('2018-01-01').getTime(),
        owner_id: 'owner-id',
        channels: [],
        roles: [],
        presences: [],
        voice_states: [],
        emojis: [],
      },
    ]);
  }

  mockUser() {
    this.user = Reflect.construct(User, [
      this.client,
      {
        id: 'user-id',
        username: 'USERNAME',
        discriminator: 'user#0000',
        avatar: 'user avatar url',
        bot: false,
      },
    ]);
  }

  private mockGuildMember(): void {
    this.guildMember = Reflect.construct(GuildMember, [
      this.client,
      {
        id: BigInt(1),
        deaf: false,
        mute: false,
        self_mute: false,
        self_deaf: false,
        session_id: 'session-id',
        channel_id: 'channel-id',
        nick: 'nick',
        joined_at: new Date('2023-02-17').getTime(),
        user: this.user,
        roles: [],
      },
      this.guild,
    ]);
  }

  private mockInteraction(command?: Record<string, string | number>): void {
    if (!command) return;
    this.interaction = Reflect.construct(CommandInteraction, [
      this.client,
      {
        data: command,
        id: BigInt(1),
        user: this.guildMember,
      },
    ]);
    this.interaction.reply = jest.fn();
  }
}
