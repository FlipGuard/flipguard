import { UserDetails } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ACCESS_TOKEN_KEY } from '../../config/constants/local-storage';
import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { deactivateAccount, unlinkTwitterAccount } from '../requests/auth';
import { UserQueryKeys } from '../requests/user';

export const useDeactivateAccountMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(() => deactivateAccount(), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: () => {
            displaySuccessToast('Account has been deactivated');
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            queryClient.clear();
        },
    });
};

export const useUnlinkTwitterAccountMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(() => unlinkTwitterAccount(), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (updatedUser) => {
            displaySuccessToast('Twitter unlinked successfully');
            queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), () => updatedUser);
        },
    });
};
