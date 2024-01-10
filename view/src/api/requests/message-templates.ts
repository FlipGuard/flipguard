import { MessageTemplate, MessageTemplateCreateDto, MessageTemplateUpdateDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const MessageTemplateQueryKeys = {
    all: ['message-templates'] as const,
    list: () => [...MessageTemplateQueryKeys.all, 'list'] as const,
    details: () => [...MessageTemplateQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...MessageTemplateQueryKeys.details(), id] as const,
};

export const getMessageTemplates = async (): Promise<MessageTemplate[]> => {
    const result = await apiClient.get<MessageTemplate[]>('/message-templates');
    result.data.sort((a, b) => a.id.localeCompare(b.id));
    return result.data;
};

export const getMessageTemplate = async (templateId: string): Promise<MessageTemplate> => {
    const result = await apiClient.get<MessageTemplate>('/message-templates/' + templateId);
    return result.data;
};

export const createMessageTemplate = async (dto: MessageTemplateCreateDto): Promise<MessageTemplate> => {
    const result = await apiClient.post<MessageTemplate>('/message-templates', dto);
    return result.data;
};

export const updateMessageTemplate = async (
    messageTemplateId: string,
    dto: MessageTemplateUpdateDto,
): Promise<MessageTemplate> => {
    const result = await apiClient.patch<MessageTemplate>(`/message-templates/${messageTemplateId}`, dto);
    return result.data;
};

export const deleteMessageTemplate = async (messageTemplateId: string): Promise<void> => {
    await apiClient.delete(`/message-templates/${messageTemplateId}`);
};
