import {
    Integration,
    IntegrationCreateDto,
    integrationToMetadata,
    IntegrationUpdateDto,
    UserDetails,
} from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import {
    createIntegration,
    deleteIntegration,
    IntegrationQueryKeys,
    updateIntegration,
} from '../requests/integrations';
import { UserQueryKeys } from '../requests/user';

export const useIntegrationAddMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((newIntegration: IntegrationCreateDto) => createIntegration(newIntegration), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data: Integration) => {
            displaySuccessToast(`"${data.id}" has been added.`);

            queryClient.setQueryData<Integration[]>(IntegrationQueryKeys.list(), (integrations) => {
                if (integrations !== undefined) {
                    return [...integrations, data];
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            integrations: [...userDetails.metadata.integrations, integrationToMetadata(data)],
                        },
                    };
                }
            });
        },
    });
};

type UpdateMutationVariables = {
    integrationId: string;
    dto: IntegrationUpdateDto;
};

export const useIntegrationUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(({ integrationId, dto }: UpdateMutationVariables) => updateIntegration(integrationId, dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (newIntegration) => {
            const updatedIntegration = newIntegration;
            displaySuccessToast(`"${updatedIntegration.id}" has been updated.`);

            queryClient.setQueryData<Integration>(IntegrationQueryKeys.detail(newIntegration.id), () => newIntegration);

            queryClient.setQueryData<Integration[]>(IntegrationQueryKeys.list(), (integrations) => {
                if (integrations !== undefined) {
                    return integrations.map((i) => (i.id !== updatedIntegration.id ? i : updatedIntegration));
                }
            });
        },
    });
};

export const useIntegrationDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((integrationId: string) => deleteIntegration(integrationId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data, variables: string) => {
            const deletedIntegrationId = variables;
            displaySuccessToast(`"${deletedIntegrationId}" has been deleted.`);

            queryClient.removeQueries(IntegrationQueryKeys.detail(deletedIntegrationId));

            queryClient.setQueryData<Integration[]>(IntegrationQueryKeys.list(), (integrations) => {
                if (integrations !== undefined) {
                    return integrations.filter((s) => s.id !== deletedIntegrationId);
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            integrations: userDetails.metadata.integrations.filter(
                                (s) => s.id !== deletedIntegrationId,
                            ),
                        },
                    };
                }
            });
        },
    });
};
