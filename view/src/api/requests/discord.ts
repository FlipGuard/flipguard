import { DiscordRole } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const DiscordQueryKeys = {
    all: ['discord'] as const,
    roles: () => [...DiscordQueryKeys.all, 'roles'] as const,
    rolesForGuild: (guildId: string) => [...DiscordQueryKeys.roles(), guildId, 'all'] as const,
    myRolesForGuild: (guildId: string) => [...DiscordQueryKeys.roles(), guildId, 'me'] as const,
};

export const getMyDiscordRoles = async (guildId: string): Promise<DiscordRole[]> => {
    const response = await apiClient.get<Promise<DiscordRole[]>>(`/discord/guilds/${guildId}/roles/me`);
    return response.data;
};

export const getGuildRoles = async (guildId: string): Promise<DiscordRole[]> => {
    const response = await apiClient.get<Promise<DiscordRole[]>>(`/discord/guilds/${guildId}/roles`);
    return response.data;
};
