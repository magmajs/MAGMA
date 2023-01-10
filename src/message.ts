import { Client } from "./client";
import { DiscordShard } from "./shard";
import { DiscordGuild } from "./guild";

export class DiscordMessage {
    id: any;
    guild: any;
    shard: any;
    client: any;
    author: any;
    content: any;
    channelID: any;
    timestamp: any;
    editedTimestamp: any;
    tts: any;
    mentionEveryone: any;
    mentions: any;
    mentionRoles: any;
    attachments: any;
    embeds: any;
    reactions: any;
    nonce: any;
    pinned: any;
    webhookID: any;
    type: any;
    activity: any;
    application: any;
    messageReference: any;
    flags: any;
    stickers: any;
    referencedMessage: any;
    interaction: any;
    thread: any;
    components: any;
    member: any;
    constructor(data: any, client: Client, guild: DiscordGuild, shard: DiscordShard = guild.shard) {
        this.id = data.id;
        this.guild = guild;
        this.shard = shard;
        this.client = client;
        this.author = data.author;
        this.content = data.content;
        this.channelID = data.channel_id;
        this.timestamp = data.timestamp;
        this.editedTimestamp = data.edited_timestamp;
        this.tts = data.tts;
        this.mentionEveryone = data.mention_everyone;
        this.mentions = data.mentions;
        this.mentionRoles = data.mention_roles;
        this.attachments = data.attachments;
        this.embeds = data.embeds;
        this.reactions = data.reactions;
        this.nonce = data.nonce;
        this.pinned = data.pinned;
        this.webhookID = data.webhook_id;
        this.type = data.type;
        this.activity = data.activity;
        this.application = data.application;
        this.messageReference = data.message_reference;
        this.flags = data.flags;
        this.stickers = data.stickers;
        this.referencedMessage = data.referenced_message;
        this.interaction = data.interaction;
        this.thread = data.thread;
        this.components = data.components;
        this.member = data.member;
    }

    public async reply(content: any) {
        if (typeof content === "object") {
            content.messageReference = {
                message_id: this.id,
                channel_id: this.channelID,
                guild_id: this.guild.id,
            };
            return await this.client.createMessage(content);
        } else {
            return await this.client.createMessage({
                content: content,
                channelID: this.channelID,
                messageReference: {
                    message_id: this.id,
                    channel_id: this.channelID,
                    guild_id: this.guild.id,
                }
            });
        }
    }
}