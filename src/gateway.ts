import { EventEmitter } from "events";
import WebSocket from "ws";
import { Client } from "./client";
import { GatewaySendOptions } from "./types";
import { Heartbeater } from "./heartbeater";
import { DiscordGuild } from "./guild";
import { DiscordMessage } from "./message";

export class DiscordGateway {
    public readonly url: string;
    public readonly shardID: number;
    public readonly events: EventEmitter;
    public readonly version: number;
    public open: boolean;
    private _token: string;
    public ws: WebSocket;
    public heartbeatInterval: number;
    public lastHeartbeatAck: boolean;
    public lastHeartbeatSent: number;
    public client: Client;
    public shard: any;
    public heartbeater: Heartbeater;
    public intents: number;

    constructor(url: string, shardID: number, client: Client, shard: any, token: string, intents: number, version: number = 9) {
        this.events = new EventEmitter();
        this.url = url;
        this.shardID = shardID;
        this._token = token;
        this.version = version;
        this.client = client;
        this.shard = shard;
        this.open = false;
        this.intents = intents;
    }

    public async connect() {
        this.ws = new WebSocket(this.url + `?v=${this.version}&encoding=json`);

        this.ws.on("open", () => {
            this.identify();
            this.open = true;
        });

        this.ws.on("message", (data) => {
            const payload = JSON.parse(data.toString());

            this.client.emit("raw", payload);

            this.handlePayload(payload);
        });
    }

    public async send (data: GatewaySendOptions) {
        this.ws.send(JSON.stringify({ op: data.op, d: data.d }));
    }

    public async sendRaw (data: any) {
        this.ws.send(JSON.stringify(data));
    }

    private async handlePayload(payload: any) {
        if (payload.op === 10) {
            this.heartbeatInterval = payload.d.heartbeat_interval;
            this.lastHeartbeatAck = true;
            this.lastHeartbeatSent = Date.now();
            this.heartbeater = new Heartbeater(this, this.heartbeatInterval);
            this.heartbeater.start();
        } else if (payload.op === 11) {
            this.lastHeartbeatAck = true;
        } else if (payload.op === 0) {
            if (payload.t === "READY") {
                this.client.emit("ready", payload.d);
            } else if (payload.t === "GUILD_CREATE") {
                const guild = new DiscordGuild(payload.d, this.shard);
                this.client.guilds.set(guild.id, guild);
                this.client.emit("guildCreate", guild);
            } else if (payload.t === "GUILD_DELETE") {
                const guild = this.client.guilds.get(payload.d.id);
                this.client.guilds.delete(payload.d.id);
                this.client.emit("guildDelete", guild);
            } else if (payload.t === "GUILD_UPDATE") {
                /*const guild = this.client.guilds.get(payload.d.id);
                guild.update(payload.d);
                this.client.emit("guildUpdate", guild);*/
            } else if (payload.t === "MESSAGE_CREATE") {
                const message = new DiscordMessage(payload.d, this.client, this.client.guilds.get(payload.d.guild_id));
                this.client.emit("messageCreate", message);
            } else if (payload.t === "VOICE_STATE_UPDATE") {
                if (payload.d.channel_id) {
                    this.client.voiceStates.set(payload.d.user_id, payload.d);
                    this.client.guilds.get(payload.d.guild_id).voiceStates.set(payload.d.user_id, payload.d);
                } else {
                    this.client.guilds.get(payload.d.guild_id).voiceStates.set(payload.d.user_id, payload.d);
                    this.client.voiceStates.delete(payload.d.user_id);
                }

                const guildID = payload.d.guild_id;

                const methods = this.client.voiceAdapters.get(guildID);

                if (methods) {
                    methods.onVoiceStateUpdate(payload.d);
                }
            } else if (payload.t === "VOICE_SERVER_UPDATE") {
                const guildID = payload.d.guild_id;

                const methods = this.client.voiceAdapters.get(guildID);

                if (methods) {
                    methods.onVoiceServerUpdate(payload.d);
                }
            }
        }
    }

    public identify() {
        this.ws.send(
            JSON.stringify({
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
            })
        );
    }
}