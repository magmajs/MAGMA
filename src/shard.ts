import { Client } from "./client";
import { DiscordGateway } from "./gateway";

export class DiscordShard {
    public readonly client: Client;
    public readonly shardID: number;
    public readonly gateway: DiscordGateway;
    private _token: string;
    constructor(client: any, shardID: any, url: any, token: string, intents: number) {
        this.client = client;
        this.shardID = shardID;
        this._token = token;
        this.gateway = new DiscordGateway(url, shardID, client, this, token, intents);
    }

    public async connect() {
        await this.gateway.connect();
    }
}