import { Client } from "./client";
import { DiscordMessage } from "./message";

export enum DiscordTokenType {
    Bot = "Bot",
    Bearer = "Bearer"
}

export enum DiscordRestVersion {
    v6 = 6,
    v7 = 7,
    v8 = 8,
    v9 = 9,
    v10 = 10
}

export enum DiscordIntents {
    Guilds = 1 << 0,
    GuildMembers = 1 << 1,
    GuildBans = 1 << 2,
    GuildEmojis = 1 << 3,
    GuildIntegrations = 1 << 4,
    GuildWebhooks = 1 << 5,
    GuildInvites = 1 << 6,
    GuildVoiceStates = 1 << 7,
    GuildPresences = 1 << 8,
    GuildMessages = 1 << 9,
    GuildMessageReactions = 1 << 10,
    GuildMessageTyping = 1 << 11,
    DirectMessages = 1 << 12,
    DirectMessageReactions = 1 << 13,
    DirectMessageTyping = 1 << 14,
    MessageContent = 1 << 15,
    GuildScheduledEvents = 1 << 16,
    AutoModerationConfiguration = 1 << 20,
    AutoModerationExecution = 1 << 21
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