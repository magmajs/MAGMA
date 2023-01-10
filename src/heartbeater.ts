import WebSocket from "ws";
import { EventEmitter } from "events";
import { DiscordGateway } from "./gateway";

export class Heartbeater extends EventEmitter {
    public Gateway: DiscordGateway;
    private _interval: NodeJS.Timeout;
    public readonly heartbeatInterval: number;

    constructor(gateway: DiscordGateway, heartbeatInterval: number) {
        super();
        this.Gateway = gateway;
        this.heartbeatInterval = heartbeatInterval;
    }

    public async start() {
        this._interval = setInterval(() => {
            this.Gateway.send({ op: 1, d: null });
            this.Gateway.client.emit("debug", `Heartbeat sent to shard ${this.Gateway.shardID}`);
        }, this.heartbeatInterval);
    }

    public async stop() {
        clearInterval(this._interval);
    }
}