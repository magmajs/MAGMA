import { DiscordShard } from "./shard";

export class DiscordGuild {
    public premiumSubscriptionCount: any;
    public shard: DiscordShard;
    public nsfw: any;
    public premiumProgressBarEnabled: any;
    public region: any;
    public preferredLocale: any;
    public verifcationLevel: any;
    public presences: any;
    public large: any;
    public unavailable: any;
    public publicUpdatesChannelID: any;
    public memberCount: any;
    public afkTimeout: any;
    public premiumTier: any;
    public description: any;
    public embeddedActivities: any;
    public rulesChannelID: any;
    public maxVideoChannelUsers: any;
    public descovrySplash: any;
    public maxStageVideoChannelUsers: any;
    public id: any;
    public homeHeader: any;
    public systemChannelID: any;
    public voiceStates: any;
    public guildHashes: any;
    public vanityURLCode: any;
    public maxMembers: any;
    public icon: any;
    public explcitContentFilter: any;
    public lazy: any;
    public hubType: any;
    public channels: any;
    public threads: any;
    public defaultMessageNotifications: any;
    public stageInstances: any;
    public emojis: any;
    public applicationID: any;
    public members: any;
    public roles: any;
    public afkChannelID: any;
    public joinedAt: any;
    public guildScheduledEvents: any;
    public splash: any;
    public systemChannelFlags: any;
    public nsfwLevel: any;
    public banner: any;
    public stickers: any;
    public name: any;
    public ownerID: any;
    public features: any;
    public mfaLevel: any;
    public applicationCommandCounts: any;
    public safteyAlertsChannelID: any;
    constructor(data: any, shard: DiscordShard) {
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

    private parseVoiceStates(voice_states: any) {
        const states = new Map();

        for (const state of voice_states) {
            states.set(state.user_id, state);
        }

        return states;
    }

    public voiceAdapterCreator() {
        return (methods: any) => {
            this.shard.client.voiceAdapters.set(this.id, methods);
            return {
                sendPayload: (data: any) => {
                    this.shard.gateway.sendRaw(data);
                    return true;
                },
                destroy: () => {
                    this.shard.client.voiceAdapters.delete(this.id);
                }
            }
        }
    }
}