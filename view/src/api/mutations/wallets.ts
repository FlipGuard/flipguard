import { UserDetails, WalletChain } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { BotQueryKeys } from '../requests/tracking-bots';
import { UserQueryKeys } from '../requests/user';
import { createNonce, unlinkWallet, USER_WALLETS_KEY, verifySignature } from '../requests/wallets';

type CreateNonceParams = {
    chain: WalletChain;
    wallet: string;
};

export const useCreateNonceMutation = () => {
    return useMutation([USER_WALLETS_KEY], ({ chain, wallet }: CreateNonceParams) => createNonce(chain, { wallet }), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
    });
};

type VerifySignatureParams = {
    chain: WalletChain;
    signature: string;
};

export const useVerifySignatureMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        [USER_WALLETS_KEY],
        ({ chain, signature }: VerifySignatureParams) => verifySignature(chain, { signature }),
        {
            onError: (error: Error) => {
                displayErrorToast(error.message);
            },
            onSuccess: ({ success, wallet }, { chain }) => {
                if (success) {
                    displaySuccessToast('Wallet linked successfully');

                    queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                        if (userDetails !== undefined) {
                            return {
                                ...userDetails,
                                wallets: {
                                    ...userDetails.wallets,
                                    [chain]: {
                                        ...userDetails.wallets[chain],
                                        address: wallet,
                                    },
                                },
                            };
                        }
                    });

                    setTimeout(() => queryClient.refetchQueries(UserQueryKeys.me()), 3000);
                }
            },
        },
    );
};

export const useUnlinkWalletMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([USER_WALLETS_KEY], (chain: WalletChain) => unlinkWallet(chain), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async (success, chain) => {
            if (success) {
                displaySuccessToast('Wallet unlinked successfully');

                await queryClient.invalidateQueries(BotQueryKeys.all);

                queryClient.setQueryData<UserDetails>(UserQueryKeys.me(), (userDetails) => {
                    if (userDetails !== undefined) {
                        return {
                            ...userDetails,
                            wallets: {
                                ...userDetails.wallets,
                                [chain]: {
                                    ...userDetails.wallets[chain],
                                    address: '',
                                },
                            },
                            limits: {
                                ...userDetails.limits,
                            },
                        };
                    }
                });

                setTimeout(() => queryClient.refetchQueries(UserQueryKeys.me()), 3000);
            }
        },
    });
};
