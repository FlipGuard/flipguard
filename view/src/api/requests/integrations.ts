import { Integration, IntegrationCreateDto, IntegrationUpdateDto, IntegrationValidateDto } from '@flipguard/webapp-api';
import { AxiosError } from 'axios';

import { apiClient } from '../http-client';

export const IntegrationQueryKeys = {
    all: ['integrations'] as const,
    list: () => [...IntegrationQueryKeys.all, 'list'] as const,
    details: () => [...IntegrationQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...IntegrationQueryKeys.details(), id] as const,
};

export const getIntegrations = async (): Promise<Integration[]> => {
    const result = await apiClient.get<Integration[]>('/integrations');
    result.data.sort((a, b) => a.id.localeCompare(b.id));
    return result.data;
};

export const getIntegration = async <T extends Integration>(integrationId: string): Promise<T | undefined> => {
    const result = await apiClient.get<Integration>('/integrations/' + integrationId);
    return result.data as T;
};

export const validateIntegration = async (dto: IntegrationValidateDto): Promise<string> => {
    try {
        await apiClient.post('/integrations/validate', dto);
        return '';
    } catch (err) {
        const error = err as AxiosError;
        return error.message;
    }
};

export const createIntegration = async (dto: IntegrationCreateDto): Promise<Integration> => {
    const result = await apiClient.post<Integration>('/integrations', dto);
    return result.data;
};

export const updateIntegration = async (integrationId: string, dto: IntegrationUpdateDto): Promise<Integration> => {
    const result = await apiClient.patch<Integration>(`/integrations/${integrationId}`, dto);
    return result.data;
};

export const deleteIntegration = async (integrationId: string): Promise<void> => {
    await apiClient.delete(`/integrations/${integrationId}`);
};
