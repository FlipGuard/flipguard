import { BotExtensionCreateDto, BotExtensionGetDto, BotExtensionUpdateDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const EXTENSIONS_KEY = 'extensions';

export const getExtensions = async (): Promise<BotExtensionGetDto[]> => {
    const result = await apiClient.get<BotExtensionGetDto[]>('/bot-extensions');
    result.data.sort((a, b) => a.id.localeCompare(b.id));
    return result.data;
};

export const createExtension = async (dto: BotExtensionCreateDto): Promise<BotExtensionGetDto> => {
    const result = await apiClient.post<BotExtensionGetDto>('/bot-extensions', dto);
    return result.data;
};

export const updateExtension = async (extensionId: string, dto: BotExtensionUpdateDto): Promise<BotExtensionGetDto> => {
    const result = await apiClient.patch<BotExtensionGetDto>(`/bot-extensions/${extensionId}`, dto);
    return result.data;
};

export const deleteExtension = async (extensionId: string): Promise<void> => {
    await apiClient.delete(`/bot-extensions/${extensionId}`);
};
