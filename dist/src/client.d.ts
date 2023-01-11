/// <reference types="node" />
import { EventEmitter } from "events";
import { DiscordRest } from "./rest";
import { ClientOptions, DiscordConnectOptions, CreateMessageOptions } from "./types";
export declare class Client extends EventEmitter {
    rest: DiscordRest;
    private _token;
    private _tokenType;
    private _restVersion;
    private _recomendedShards;
    private _selectedShardCount;
    private _GateWayURL;
    shardCount: number;
    shards: any[];
    intents: number;
    guilds: Map<string, any>;
    voiceAdapters: Map<string, any>;
    voiceStates: Map<string, any>;
    constructor(options: ClientOptions);
    joinVoiceChannel(channelID: string, guildID: string): Promise<import("@discordjs/voice").VoiceConnection>;
    createMessage(options: CreateMessageOptions): Promise<void>;
    connect(options: DiscordConnectOptions): Promise<void>;
}
