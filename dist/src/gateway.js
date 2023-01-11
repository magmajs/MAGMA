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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordGateway = void 0;
const events_1 = require("events");
const ws_1 = __importDefault(require("ws"));
const heartbeater_1 = require("./heartbeater");
const guild_1 = require("./guild");
const message_1 = require("./message");
class DiscordGateway {
    constructor(url, shardID, client, shard, token, intents, version = 9) {
        this.events = new events_1.EventEmitter();
        this.url = url;
        this.shardID = shardID;
        this._token = token;
        this.version = version;
        this.client = client;
        this.shard = shard;
        this.open = false;
        this.intents = intents;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ws = new ws_1.default(this.url + `?v=${this.version}&encoding=json`);
            this.ws.on("open", () => {
                this.identify();
                this.open = true;
            });
            this.ws.on("message", (data) => {
                const payload = JSON.parse(data.toString());
                this.client.emit("raw", payload);
                this.handlePayload(payload);
            });
        });
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ws.send(JSON.stringify({ op: data.op, d: data.d }));
        });
    }
    sendRaw(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ws.send(JSON.stringify(data));
        });
    }
    handlePayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload.op === 10) {
                this.heartbeatInterval = payload.d.heartbeat_interval;
                this.lastHeartbeatAck = true;
                this.lastHeartbeatSent = Date.now();
                this.heartbeater = new heartbeater_1.Heartbeater(this, this.heartbeatInterval);
                this.heartbeater.start();
            }
            else if (payload.op === 11) {
                this.lastHeartbeatAck = true;
            }
            else if (payload.op === 0) {
                if (payload.t === "READY") {
                    this.client.emit("ready", payload.d);
                }
                else if (payload.t === "GUILD_CREATE") {
                    const guild = new guild_1.DiscordGuild(payload.d, this.shard);
                    this.client.guilds.set(guild.id, guild);
                    this.client.emit("guildCreate", guild);
                }
                else if (payload.t === "GUILD_DELETE") {
                    const guild = this.client.guilds.get(payload.d.id);
                    this.client.guilds.delete(payload.d.id);
                    this.client.emit("guildDelete", guild);
                }
                else if (payload.t === "GUILD_UPDATE") {
                }
                else if (payload.t === "MESSAGE_CREATE") {
                    const message = new message_1.DiscordMessage(payload.d, this.client, this.client.guilds.get(payload.d.guild_id));
                    this.client.emit("messageCreate", message);
                }
                else if (payload.t === "VOICE_STATE_UPDATE") {
                    if (payload.d.channel_id) {
                        this.client.voiceStates.set(payload.d.user_id, payload.d);
                        this.client.guilds.get(payload.d.guild_id).voiceStates.set(payload.d.user_id, payload.d);
                    }
                    else {
                        this.client.guilds.get(payload.d.guild_id).voiceStates.set(payload.d.user_id, payload.d);
                        this.client.voiceStates.delete(payload.d.user_id);
                    }
                    const guildID = payload.d.guild_id;
                    const methods = this.client.voiceAdapters.get(guildID);
                    if (methods) {
                        methods.onVoiceStateUpdate(payload.d);
                    }
                }
                else if (payload.t === "VOICE_SERVER_UPDATE") {
                    const guildID = payload.d.guild_id;
                    const methods = this.client.voiceAdapters.get(guildID);
                    if (methods) {
                        methods.onVoiceServerUpdate(payload.d);
                    }
                }
            }
        });
    }
    identify() {
        this.ws.send(JSON.stringify({
            op: 2,
            d: {
                token: this._token,
                intents: this.intents,
                properties: {
                    $os: "linux",
                    $browser: "magma",
                    $device: "magma",
                },
                shard: [this.shardID, this.client.shardCount],
            },
        }));
    }
}
exports.DiscordGateway = DiscordGateway;
