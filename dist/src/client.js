"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const events_1 = require("events");
const rest_1 = require("./rest");
const types_1 = require("./types");
const shard_1 = require("./shard");
const voice_1 = require("@discordjs/voice");
class Client extends events_1.EventEmitter {
    constructor(options) {
        super();
        this._restVersion = options.restVersion || 10;
        this.intents = 0;
        if (options.shardCount) {
            if (options.shardCount === "auto") {
                this._selectedShardCount = "auto";
            }
            else {
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
    joinVoiceChannel(channelID, guildID) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = this.guilds.get(guildID);
            if (!guild) {
                this.emit("error", new Error("Guild not found"));
                return;
            }
            const adapterCreator = guild.voiceAdapterCreator();
            return (0, voice_1.joinVoiceChannel)({
                channelId: channelID,
                guildId: guildID,
                adapterCreator,
            });
        });
    }
    createMessage(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rest.post({
                path: `/channels/${options.channelID}/messages`,
                body: {
                    content: options.content,
                    tts: options.tts,
                    embeds: options.embeds,
                    message_reference: options.messageReference,
                }
            });
        });
    }
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this._token = options.token;
            this._tokenType = options.tokenType || types_1.DiscordTokenType.Bot;
            this.rest = new rest_1.DiscordRest({
                token: this._token,
                tokenType: this._tokenType,
                version: 9,
                client: this,
            });
            const gatewayData = yield this.rest.get({
                path: "/gateway/bot",
            }).then((res) => __awaiter(this, void 0, void 0, function* () { return yield res.json(); }));
            this._recomendedShards = gatewayData.shards;
            this._GateWayURL = gatewayData.url;
            if (this._selectedShardCount === "auto") {
                this.shardCount = this._recomendedShards;
            }
            else if (this._selectedShardCount > this._recomendedShards) {
                this.emit("warn", "Selected shard count is higher than recomended shard count");
                this.shardCount = this._recomendedShards;
            }
            else if (!this._selectedShardCount) {
                this.shardCount = 1;
            }
            else {
                this.shardCount = this._selectedShardCount;
            }
            for (let i = 0; i < this.shardCount; i++) {
                const shard = new shard_1.DiscordShard(this, i, this._GateWayURL, this._token, this.intents);
                yield shard.connect();
                this.shards.push(shard);
            }
        });
    }
}
exports.Client = Client;
