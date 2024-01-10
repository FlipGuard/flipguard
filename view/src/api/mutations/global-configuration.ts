import { WebappCustomGlobalConfiguration } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { GlobalConfigQueryKeys, updateCustomGlobalConfiguration } from '../requests/global-configuration';

export const useUpdateCustomGlobalConfiguration = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: WebappCustomGlobalConfiguration) => updateCustomGlobalConfiguration(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async (config: WebappCustomGlobalConfiguration) => {
            displaySuccessToast('Discord server settings has been updated');
            queryClient.setQueryData(GlobalConfigQueryKeys.custom(), config);
        },
    });
};
