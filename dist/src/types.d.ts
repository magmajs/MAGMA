import { Client } from "./client";
export declare enum DiscordTokenType {
    Bot = "Bot",
    Bearer = "Bearer"
}
export declare enum DiscordRestVersion {
    v6 = 6,
    v7 = 7,
    v8 = 8,
    v9 = 9,
    v10 = 10
}
export declare enum DiscordIntents {
    Guilds = 1,
    GuildMembers = 2,
    GuildBans = 4,
    GuildEmojis = 8,
    GuildIntegrations = 16,
    GuildWebhooks = 32,
    GuildInvites = 64,
    GuildVoiceStates = 128,
    GuildPresences = 256,
    GuildMessages = 512,
    GuildMessageReactions = 1024,
    GuildMessageTyping = 2048,
    DirectMessages = 4096,
    DirectMessageReactions = 8192,
    DirectMessageTyping = 16384,
    MessageContent = 32768,
    GuildScheduledEvents = 65536,
    AutoModerationConfiguration = 1048576,
    AutoModerationExecution = 2097152
}
export interface ClientOptions {
    restVersion?: DiscordRestVersion;
    shardCount?: number | "auto";
    shardID?: number;
    intents?: Array<DiscordIntents>;
}
export interface DiscordRestOptions {
    token: string;
    tokenType: DiscordTokenType;
    version: DiscordRestVersion;
    client: Client;
}
export interface DiscordConnectOptions {
    token: string;
    tokenType?: DiscordTokenType;
}
export interface GatewaySendOptions {
    op: number;
    d?: any;
}
export interface CreateMessageOptions {
    content: string;
    tts?: boolean;
    embeds?: any[];
    embed?: any;
    channelID: string;
    messageReference?: any;
}
export interface RestSendOptions {
    path: string;
    body?: any;
    headers?: any;
}
