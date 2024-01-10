import {
    MessageTemplate,
    MessageTemplateCreateDto,
    messageTemplateToMetadata,
    MessageTemplateUpdateDto,
    UserDetails,
} from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import {
    createMessageTemplate,
    deleteMessageTemplate,
    MessageTemplateQueryKeys,
    updateMessageTemplate,
} from '../requests/message-templates';
import { UserQueryKeys } from '../requests/user';

export const useMessageTemplateAddMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((newTemplate: MessageTemplateCreateDto) => createMessageTemplate(newTemplate), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data: MessageTemplate) => {
            displaySuccessToast(`"${data.id}" has been created.`);

            queryClient.setQueryData<MessageTemplate[]>(MessageTemplateQueryKeys.list(), (templates) => {
                if (templates !== undefined) {
                    return [...templates, data];
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    const newUserDetails: UserDetails = {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            templates: [...userDetails.metadata.templates, messageTemplateToMetadata(data)],
                        },
                    };
                    return newUserDetails;
                }
            });
        },
    });
};

type UpdateMutationVariables = {
    templateId: string;
    dto: MessageTemplateUpdateDto;
};

export const useMessageTemplateUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(({ templateId, dto }: UpdateMutationVariables) => updateMessageTemplate(templateId, dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (newTemplate) => {
            displaySuccessToast(`"${newTemplate.id}" has been updated.`);

            queryClient.setQueryData<MessageTemplate>(
                MessageTemplateQueryKeys.detail(newTemplate.id),
                () => newTemplate,
            );

            queryClient.setQueryData<MessageTemplate[]>(MessageTemplateQueryKeys.list(), (templates) => {
                if (templates !== undefined) {
                    return templates.map((t) => (t.id !== newTemplate.id ? t : newTemplate));
                }
            });
        },
    });
};

export const useMessageTemplateDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((templateId: string) => deleteMessageTemplate(templateId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data, variables: string) => {
            const deletedTemplateId = variables;
            displaySuccessToast(`"${deletedTemplateId}" has been deleted.`);

            queryClient.removeQueries(MessageTemplateQueryKeys.detail(deletedTemplateId));

            queryClient.setQueryData<MessageTemplate[]>(MessageTemplateQueryKeys.list(), (templates) => {
                if (templates !== undefined) {
                    return templates.filter((t) => t.id !== deletedTemplateId);
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            templates: userDetails.metadata.templates.filter((t) => t.id !== deletedTemplateId),
                        },
                    };
                }
            });
        },
    });
};
