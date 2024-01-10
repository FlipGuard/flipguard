import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { FlipProfileQueryKeys } from '../requests/flip-profiles';
import { requestSync } from '../requests/sync';
import { UserQueryKeys } from '../requests/user';

export const useRequestSyncMutation = () => {
    const queryClient = useQueryClient();

    const [syncing, setSyncing] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const mutation = useMutation(requestSync, {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: () => {
            displaySuccessToast(`Profile information request has been queued`);

            setSyncing(true);
            setDisabled(true);

            setTimeout(async () => {
                await queryClient.refetchQueries(UserQueryKeys.me());
                await queryClient.refetchQueries(FlipProfileQueryKeys.me());
                setSyncing(false);
            }, 5000);

            setTimeout(() => setDisabled(false), 60_000);
        },
    });

    return { mutation, syncing, disabled };
};
