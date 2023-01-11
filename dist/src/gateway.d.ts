/// <reference types="node" />
import { EventEmitter } from "events";
import WebSocket from "ws";
import { Client } from "./client";
import { GatewaySendOptions } from "./types";
import { Heartbeater } from "./heartbeater";
export declare class DiscordGateway {
    readonly url: string;
    readonly shardID: number;
    readonly events: EventEmitter;
    readonly version: number;
    open: boolean;
    private _token;
    ws: WebSocket;
    heartbeatInterval: number;
    lastHeartbeatAck: boolean;
    lastHeartbeatSent: number;
    client: Client;
    shard: any;
    heartbeater: Heartbeater;
    intents: number;
    constructor(url: string, shardID: number, client: Client, shard: any, token: string, intents: number, version?: number);
    connect(): Promise<void>;
    send(data: GatewaySendOptions): Promise<void>;
    sendRaw(data: any): Promise<void>;
    private handlePayload;
    identify(): void;
}
