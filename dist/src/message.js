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
exports.DiscordMessage = void 0;
class DiscordMessage {
    constructor(data, client, guild, shard = guild.shard) {
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
    reply(content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof content === "object") {
                content.messageReference = {
                    message_id: this.id,
                    channel_id: this.channelID,
                    guild_id: this.guild.id,
                };
                return yield this.client.createMessage(content);
            }
            else {
                return yield this.client.createMessage({
                    content: content,
                    channelID: this.channelID,
                    messageReference: {
                        message_id: this.id,
                        channel_id: this.channelID,
                        guild_id: this.guild.id,
                    }
                });
            }
        });
    }
}
exports.DiscordMessage = DiscordMessage;
