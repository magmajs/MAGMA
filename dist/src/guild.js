"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordGuild = void 0;
class DiscordGuild {
    constructor(data, shard) {
        this.premiumSubscriptionCount = data.premium_subscription_count;
        this.shard = shard;
        this.nsfw = data.nsfw;
        this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        this.region = data.region;
        this.preferredLocale = data.preferred_locale;
        this.verifcationLevel = data.verification_level;
        this.presences = data.presences;
        this.large = data.large;
        this.unavailable = data.unavailable;
        this.publicUpdatesChannelID = data.public_updates_channel_id;
        this.memberCount = data.member_count;
        this.afkTimeout = data.afk_timeout;
        this.premiumTier = data.premium_tier;
        this.description = data.description;
        this.embeddedActivities = data.embedded_activities;
        this.rulesChannelID = data.rules_channel_id;
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.descovrySplash = data.discovery_splash;
        this.maxStageVideoChannelUsers = data.max_stage_video_channel_users;
        this.id = data.id;
        this.homeHeader = data.home_header;
        this.systemChannelID = data.system_channel_id;
        this.voiceStates = this.parseVoiceStates(data.voice_states);
        this.guildHashes = data.guild_hashes;
        this.vanityURLCode = data.vanity_url_code;
        this.maxMembers = data.max_members;
        this.icon = data.icon;
        this.explcitContentFilter = data.explicit_content_filter;
        this.lazy = data.lazy;
        this.hubType = data.hub_type;
        this.channels = data.channels;
        this.threads = data.threads;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.stageInstances = data.stage_instances;
        this.emojis = data.emojis;
        this.applicationID = data.application_id;
        this.members = data.members;
        this.roles = data.roles;
        this.afkChannelID = data.afk_channel_id;
        this.joinedAt = data.joined_at;
        this.guildScheduledEvents = data.guild_scheduled_events;
        this.splash = data.splash;
        this.systemChannelFlags = data.system_channel_flags;
        this.nsfwLevel = data.nsfw_level;
        this.banner = data.banner;
        this.stickers = data.stickers;
        this.name = data.name;
        this.ownerID = data.owner_id;
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.applicationCommandCounts = data.application_command_counts;
        this.safteyAlertsChannelID = data.safety_alerts_channel_id;
    }
    parseVoiceStates(voice_states) {
        const states = new Map();
        for (const state of voice_states) {
            states.set(state.user_id, state);
        }
        return states;
    }
    voiceAdapterCreator() {
        return (methods) => {
            this.shard.client.voiceAdapters.set(this.id, methods);
            return {
                sendPayload: (data) => {
                    this.shard.gateway.sendRaw(data);
                    return true;
                },
                destroy: () => {
                    this.shard.client.voiceAdapters.delete(this.id);
                }
            };
        };
    }
}
exports.DiscordGuild = DiscordGuild;
