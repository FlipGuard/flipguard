import { WebappCustomGlobalConfiguration } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const GlobalConfigQueryKeys = {
    all: ['global-config'] as const,
    custom: () => [...GlobalConfigQueryKeys.all, 'custom'] as const,
};

export const getCustomGlobalConfiguration = async (): Promise<WebappCustomGlobalConfiguration> => {
    const result = await apiClient.get<WebappCustomGlobalConfiguration>('/global-configuration/custom');
    return result.data;
};

export const updateCustomGlobalConfiguration = async (
    dto: WebappCustomGlobalConfiguration,
): Promise<WebappCustomGlobalConfiguration> => {
    const result = await apiClient.put<WebappCustomGlobalConfiguration>('/global-configuration/custom', dto);
    return result.data;
};
