import { distinct } from '@flipguard/commons';
import { ClaimTrialDto, OrderCancelDto, OrderCreateDto, OrderGetDto, OrderVerifyDto } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast } from '../../utils/toasts';
import { cancelOrder, claimTrial, createOrder, ORDERS_KEY, verifyOrder } from '../requests/orders';
import { UserQueryKeys } from '../requests/user';

export const useOrderCreateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([ORDERS_KEY], (dto: OrderCreateDto) => createOrder(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (newOrder: OrderGetDto) => {
            queryClient.setQueryData<OrderGetDto[]>([ORDERS_KEY], (orders) => {
                if (orders !== undefined) {
                    return distinct([newOrder, ...orders], (o) => o.id);
                }
            });
        },
    });
};

export const useClaimTrialMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([ORDERS_KEY], (dto: ClaimTrialDto) => claimTrial(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async (newOrder: OrderGetDto) => {
            queryClient.setQueryData<OrderGetDto[]>([ORDERS_KEY], (orders) => {
                if (orders !== undefined) {
                    return distinct([newOrder, ...orders], (o) => o.id);
                }
            });
            await queryClient.invalidateQueries(UserQueryKeys.me());
        },
    });
};

export const useOrderVerifyMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([ORDERS_KEY], (dto: OrderVerifyDto) => verifyOrder(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async (data: OrderGetDto) => {
            queryClient.setQueryData<OrderGetDto[]>([ORDERS_KEY], (orders) => {
                if (orders !== undefined) {
                    return orders.map((o) => (o.id === data.id ? data : o));
                }
            });
            await queryClient.invalidateQueries(UserQueryKeys.me());
        },
    });
};

export const useOrderCancelMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([ORDERS_KEY], (dto: OrderCancelDto) => cancelOrder(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async (data: OrderGetDto) => {
            queryClient.setQueryData<OrderGetDto[]>([ORDERS_KEY], (orders) => {
                if (orders !== undefined) {
                    return orders.map((o) => (o.id === data.id ? data : o));
                }
            });
            await queryClient.invalidateQueries(UserQueryKeys.me());
        },
    });
};
