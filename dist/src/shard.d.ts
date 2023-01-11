import { Client } from "./client";
import { DiscordGateway } from "./gateway";
export declare class DiscordShard {
    readonly client: Client;
    readonly shardID: number;
    readonly gateway: DiscordGateway;
    private _token;
    constructor(client: any, shardID: any, url: any, token: string, intents: number);
    connect(): Promise<void>;
}
