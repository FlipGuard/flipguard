import { ExecuteFlipRequestDto, FlipExecutedGetDto } from '@flipguard/webapp-api';
import { QueryClient, QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast } from '../../utils/toasts';
import { executeFlip } from '../requests/coinflip';
import { CoinFlipFeedsQueryKeys } from '../requests/coinflip-feeds';

export const useExecuteFlipMutation = () => {
    const queryClient = useQueryClient();

    return useMutation((dto: ExecuteFlipRequestDto) => executeFlip(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (queuedFlip) => {
            prependFlip(queryClient, CoinFlipFeedsQueryKeys.userPending(), queuedFlip);
        },
    });
};

const prependFlip = (queryClient: QueryClient, queryKey: QueryKey, flip: FlipExecutedGetDto) => {
    queryClient.setQueryData<FlipExecutedGetDto[]>(queryKey, (flips) => {
        return [flip, ...(flips ?? [])];
    });
};
