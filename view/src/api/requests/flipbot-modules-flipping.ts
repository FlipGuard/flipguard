import {
    FlipBotGuildConfigGetDto,
    FlipBotModuleFlippingSettingsUpdateDto,
    FlippingGuildStats,
    FlippingGuildTimeSeriesChartData,
    FlippingGuildTimeSeriesChartType,
    FlippingGuildTimeSeriesRange,
    PickFlippingContestWinnersRequest,
    PickFlippingContestWinnersResponse,
} from '@flipguard/webapp-api';

import { apiClient } from '../http-client';
import { FlipBotGuildConfigsQueryKeys } from './flipbot-guild-configs';

export const GuildFlippingModuleQueryKeys = {
    all: (id: string) => [...FlipBotGuildConfigsQueryKeys.detail(id), 'flipping'] as const,
    stats: (id: string) => [...GuildFlippingModuleQueryKeys.all(id), 'stats'],
    chart: (id: string, chart: FlippingGuildTimeSeriesChartType, range: FlippingGuildTimeSeriesRange) => [
        ...GuildFlippingModuleQueryKeys.all(id),
        'chart',
        chart,
        range,
    ],
};

export const updateFlippingModuleSettings = async (
    configId: string,
    dto: FlipBotModuleFlippingSettingsUpdateDto,
): Promise<FlipBotGuildConfigGetDto> => {
    const result = await apiClient.patch<FlipBotGuildConfigGetDto>('/flipbot/modules/flipping/' + configId, dto);
    return result.data;
};

export const getGuildFlippingStats = async (configId: string): Promise<FlippingGuildStats> => {
    const url = `/flipbot/modules/flipping/${configId}/stats`;
    const result = await apiClient.get<FlippingGuildStats>(url);
    return result.data;
};

export const getGuildFlippingChartData = async (
    configId: string,
    chart: FlippingGuildTimeSeriesChartType,
    range: FlippingGuildTimeSeriesRange,
): Promise<FlippingGuildTimeSeriesChartData> => {
    const url = `/flipbot/modules/flipping/${configId}/charts/${chart}/${range}`;
    const result = await apiClient.get<FlippingGuildTimeSeriesChartData>(url);
    return result.data;
};

export const setCommunityContestWinners = async (
    configId: string,
    request: PickFlippingContestWinnersRequest,
): Promise<PickFlippingContestWinnersResponse> => {
    const url = `/flipbot/modules/flipping/${configId}/contest/set-winners`;
    const result = await apiClient.post<PickFlippingContestWinnersResponse>(url, request);
    return result.data;
};
