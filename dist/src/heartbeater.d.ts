/// <reference types="node" />
import { EventEmitter } from "events";
import { DiscordGateway } from "./gateway";
export declare class Heartbeater extends EventEmitter {
    Gateway: DiscordGateway;
    private _interval;
    readonly heartbeatInterval: number;
    constructor(gateway: DiscordGateway, heartbeatInterval: number);
    start(): Promise<void>;
    stop(): Promise<void>;
}
