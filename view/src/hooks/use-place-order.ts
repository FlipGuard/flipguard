import { OrderCreateDto, OrderGetDto, OrderVerifyDto, WalletChain } from '@flipguard/webapp-api';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { useOrderCreateMutation, useOrderVerifyMutation } from '../api/mutations/orders';
import { closeToast, displayErrorToast, displayLoadingToast, displaySuccessToast } from '../utils/toasts';
import { stringToHex } from '../utils/tx';
import { useDeposit } from './use-deposit';

type PlaceOrderOptions = {
    dto: OrderCreateDto;
    onFinish?: () => void;
};

export const usePlaceOrder = () => {
    const { isConnected } = useAccount();

    const { deposit } = useDeposit();

    const createOrderMutation = useOrderCreateMutation();
    const verifyOrderMutation = useOrderVerifyMutation();

    const [sendingTransaction, setSendingTransaction] = useState(false);

    const placeOrder = ({ dto, onFinish }: PlaceOrderOptions) => {
        if (!isConnected) {
            displayErrorToast('Wallet not connected');
            onFinish && onFinish();
            return;
        }

        if (dto.pricing.chain === WalletChain.Polygon) {
            createOrderMutation.mutate(dto, {
                onSuccess: async (order) => {
                    const txHash = await transferFunds(order);
                    txHash && verifyOrder(txHash, order);
                    onFinish && onFinish();
                },
                onError: () => {
                    onFinish && onFinish();
                },
            });
        }
    };

    const transferFunds = async (order: OrderGetDto): Promise<string | undefined> => {
        setSendingTransaction(true);

        try {
            return await deposit({
                to: order.price.receiver,
                token: { symbol: 'MATIC', decimals: 18 },
                amount: order.price.amount,
                data: stringToHex(order.fulfillment.memo),
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown';
            const formatted = msg.substring(0, msg.includes('\n') ? msg.indexOf('\n') : msg.length);
            displayErrorToast(`Error: ${formatted}`);
            return undefined;
        } finally {
            setSendingTransaction(false);
        }
    };

    const verifyOrder = (txHash: string, order: OrderGetDto) => {
        const dto: OrderVerifyDto = {
            orderId: order.id,
            txHash: txHash,
        };

        const toastId = displayLoadingToast('Verifying the transaction');

        verifyOrderMutation.mutate(dto, {
            onSuccess: () => {
                displaySuccessToast('Order has been fulfilled');
            },
            onSettled: () => {
                closeToast(toastId);
            },
        });
    };

    const inProgress = createOrderMutation.isLoading || verifyOrderMutation.isLoading || sendingTransaction;

    return { placeOrder, verifyOrder, inProgress };
};
