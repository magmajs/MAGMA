"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordIntents = exports.DiscordRestVersion = exports.DiscordTokenType = void 0;
var DiscordTokenType;
(function (DiscordTokenType) {
    DiscordTokenType["Bot"] = "Bot";
    DiscordTokenType["Bearer"] = "Bearer";
})(DiscordTokenType = exports.DiscordTokenType || (exports.DiscordTokenType = {}));
var DiscordRestVersion;
(function (DiscordRestVersion) {
    DiscordRestVersion[DiscordRestVersion["v6"] = 6] = "v6";
    DiscordRestVersion[DiscordRestVersion["v7"] = 7] = "v7";
    DiscordRestVersion[DiscordRestVersion["v8"] = 8] = "v8";
    DiscordRestVersion[DiscordRestVersion["v9"] = 9] = "v9";
    DiscordRestVersion[DiscordRestVersion["v10"] = 10] = "v10";
})(DiscordRestVersion = exports.DiscordRestVersion || (exports.DiscordRestVersion = {}));
var DiscordIntents;
(function (DiscordIntents) {
    DiscordIntents[DiscordIntents["Guilds"] = 1] = "Guilds";
    DiscordIntents[DiscordIntents["GuildMembers"] = 2] = "GuildMembers";
    DiscordIntents[DiscordIntents["GuildBans"] = 4] = "GuildBans";
    DiscordIntents[DiscordIntents["GuildEmojis"] = 8] = "GuildEmojis";
    DiscordIntents[DiscordIntents["GuildIntegrations"] = 16] = "GuildIntegrations";
    DiscordIntents[DiscordIntents["GuildWebhooks"] = 32] = "GuildWebhooks";
    DiscordIntents[DiscordIntents["GuildInvites"] = 64] = "GuildInvites";
    DiscordIntents[DiscordIntents["GuildVoiceStates"] = 128] = "GuildVoiceStates";
    DiscordIntents[DiscordIntents["GuildPresences"] = 256] = "GuildPresences";
    DiscordIntents[DiscordIntents["GuildMessages"] = 512] = "GuildMessages";
    DiscordIntents[DiscordIntents["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
    DiscordIntents[DiscordIntents["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
    DiscordIntents[DiscordIntents["DirectMessages"] = 4096] = "DirectMessages";
    DiscordIntents[DiscordIntents["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
    DiscordIntents[DiscordIntents["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
    DiscordIntents[DiscordIntents["MessageContent"] = 32768] = "MessageContent";
    DiscordIntents[DiscordIntents["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
    DiscordIntents[DiscordIntents["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
    DiscordIntents[DiscordIntents["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
})(DiscordIntents = exports.DiscordIntents || (exports.DiscordIntents = {}));
