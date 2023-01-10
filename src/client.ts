import WebSocket from "ws";
import { EventEmitter } from "events";
import { DiscordRest } from "./rest";
import { ClientOptions, DiscordConnectOptions, DiscordTokenType, CreateMessageOptions } from "./types";
import { DiscordShard } from "./shard";
import { joinVoiceChannel } from "@discordjs/voice";

export class Client extends EventEmitter {
    public rest: DiscordRest;
    private _token: string;
    private _tokenType: DiscordTokenType;
    private _restVersion: number;
    private _recomendedShards: number;
    private _selectedShardCount: any;
    private _GateWayURL: string;
    public shardCount: number;
    public shards: any[];
    public intents: number;
    public guilds: Map<string, any>;
    public voiceAdapters: Map<string, any>;
    public voiceStates: Map<string, any>;

    constructor(options: ClientOptions) {
        super();
        this._restVersion = options.restVersion || 10;
        this.intents = 0;
        if (options.shardCount) {
            if (options.shardCount === "auto") {
                this._selectedShardCount = "auto";
            } else {
                this._selectedShardCount = options.shardCount;
            }
        }

        this.shards = [];
        this.guilds = new Map();
        this.voiceAdapters = new Map();
        this.voiceStates = new Map();

        for (const intent of options.intents) {
            this.intents += intent;
        }
    }

    public async joinVoiceChannel(channelID: string, guildID: string) {
        const guild = this.guilds.get(guildID);

        if (!guild) {
            this.emit("error", new Error("Guild not found"));
            return;
        }

        const adapterCreator = guild.voiceAdapterCreator();

        return joinVoiceChannel({
            channelId: channelID,
            guildId: guildID,
            adapterCreator,
        });
    }

    public async createMessage(options: CreateMessageOptions) {

        this.rest.post({
            path: `/channels/${options.channelID}/messages`,
            body: {
                content: options.content,
                tts: options.tts,
                embeds: options.embeds,
                message_reference: options.messageReference,
            }
        });
    }

    public async connect(options: DiscordConnectOptions) {
        this._token = options.token;
        this._tokenType = options.tokenType || DiscordTokenType.Bot;

        this.rest = new DiscordRest({
            token: this._token,
            tokenType: this._tokenType,
            version: 9,
            client: this,
        });

        const gatewayData = await this.rest.get({
            path: "/gateway/bot",
        }).then(async (res) => await res.json());

        this._recomendedShards = gatewayData.shards;
        this._GateWayURL = gatewayData.url;

        if (this._selectedShardCount === "auto") {
            this.shardCount = this._recomendedShards;
        } else if (this._selectedShardCount > this._recomendedShards) {
            this.emit("warn", "Selected shard count is higher than recomended shard count");
            this.shardCount = this._recomendedShards;
        } else if (!this._selectedShardCount) {
            this.shardCount = 1;
        } else {
            this.shardCount = this._selectedShardCount;
        }

        for (let i = 0; i < this.shardCount; i++) {
            const shard = new DiscordShard(this, i, this._GateWayURL, this._token, this.intents);

            await shard.connect();

            this.shards.push(shard);
        }
    }
}