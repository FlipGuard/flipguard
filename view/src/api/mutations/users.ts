import { UserDetails, UserSettings } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast } from '../../utils/toasts';
import { generateRefCode, updateUserSettings, UserQueryKeys } from '../requests/user';

export const useGenerateRefCodeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(UserQueryKeys.me(), () => generateRefCode(), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (udpatedUserDetails: UserDetails) => {
            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    return udpatedUserDetails;
                }
            });
        },
    });
};

export const useUpdateUserSettingsMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(UserQueryKeys.me(), (dto: UserSettings) => updateUserSettings(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (udpatedUserDetails: UserDetails) => {
            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                if (userDetails !== undefined) {
                    return udpatedUserDetails;
                }
            });
        },
    });
};
