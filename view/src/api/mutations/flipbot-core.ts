import { FlipBotWithdrawRequestDto } from '@flipguard/webapp-api';
import { useMutation } from '@tanstack/react-query';
import { waitForTransaction } from 'wagmi/actions';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { withdrawFundsFromFlipWallet } from '../requests/flipbot-core';

export const useWithdrawFundsFromFlipWalletMutation = () => {
    return useMutation((dto: FlipBotWithdrawRequestDto) => withdrawFundsFromFlipWallet(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async ({ transactionHash }, dto) => {
            await waitForTransaction({ hash: transactionHash as `0x${string}`, confirmations: 3 });
            displaySuccessToast(`Successfully withdrawn ${dto.amount} ${dto.token}`);
        },
    });
};
