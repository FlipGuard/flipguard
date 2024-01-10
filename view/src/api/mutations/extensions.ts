import {
    BotExtensionCreateDto,
    BotExtensionGetDto,
    botExtensionGetDtoToMetadata,
    BotExtensionUpdateDto,
    UserDetails,
} from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { createExtension, deleteExtension, EXTENSIONS_KEY, updateExtension } from '../requests/extensions';
import { UserQueryKeys } from '../requests/user';

export const useBotExtensionCreateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([EXTENSIONS_KEY], (newExtension: BotExtensionCreateDto) => createExtension(newExtension), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (createdExtension: BotExtensionGetDto) => {
            displaySuccessToast(`"${createdExtension.id}" has been created.`);

            queryClient.setQueryData<BotExtensionGetDto[]>([EXTENSIONS_KEY], (extensions) => {
                if (extensions !== undefined) {
                    return [...extensions, createdExtension];
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            extensions: [
                                ...userDetails.metadata.extensions,
                                botExtensionGetDtoToMetadata(createdExtension),
                            ],
                        },
                    };
                }
            });
        },
    });
};

type UpdateMutationVariables = {
    extensionId: string;
    dto: BotExtensionUpdateDto;
};

export const useBotExtensionUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        [EXTENSIONS_KEY],
        ({ extensionId, dto }: UpdateMutationVariables) => updateExtension(extensionId, dto),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: (updatedExtension) => {
                displaySuccessToast(`"${updatedExtension.id}" has been updated.`);

                queryClient.setQueryData<BotExtensionGetDto[]>([EXTENSIONS_KEY], (extensions) => {
                    if (extensions !== undefined) {
                        return extensions.map((i) => (i.id !== updatedExtension.id ? i : updatedExtension));
                    }
                });

                queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                    if (userDetails !== undefined) {
                        return {
                            ...userDetails,
                            metadata: {
                                ...userDetails.metadata,
                                extensions: userDetails.metadata.extensions.map((e) =>
                                    e.id === updatedExtension.id ? botExtensionGetDtoToMetadata(updatedExtension) : e,
                                ),
                            },
                        };
                    }
                });
            },
        },
    );
};

export const useBotExtensionDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([EXTENSIONS_KEY], (extensionId: string) => deleteExtension(extensionId), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (data, variables: string) => {
            const deletedBotExtensionId = variables;
            displaySuccessToast(`"${deletedBotExtensionId}" has been deleted.`);

            queryClient.setQueryData<BotExtensionGetDto[]>([EXTENSIONS_KEY], (extensions) => {
                if (extensions !== undefined) {
                    return extensions.filter((s) => s.id !== deletedBotExtensionId);
                }
            });

            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    return {
                        ...userDetails,
                        metadata: {
                            ...userDetails.metadata,
                            extensions: userDetails.metadata.extensions.filter((e) => e.id !== deletedBotExtensionId),
                        },
                    };
                }
            });
        },
    });
};
