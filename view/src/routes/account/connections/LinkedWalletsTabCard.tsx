import { WalletChain } from '@flipguard/webapp-api';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { signMessage } from 'wagmi/actions';

import { useCreateNonceMutation, useVerifySignatureMutation } from '../../../api/mutations/wallets';
import polygonIconUrl from '../../../assets/polygon-icon.png';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { useAuth } from '../../../hooks/use-auth';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { displayErrorToast } from '../../../utils/toasts';
import { UnlinkWalletConfirmationDialog } from './UnlinkWalletConfirmationDialog';

export const LinkedWalletsTabCard = () => {
    const isMobile = isViewMobile('sm');

    const { user } = useAuth();
    const { address, isConnected } = useAccount();

    const createNonceMutation = useCreateNonceMutation();
    const verifySignatureMutation = useVerifySignatureMutation();

    const [signing, setSigning] = useState(false);
    const [unlinkingChain, setUnlinkingChain] = useState<WalletChain | null>(null);

    const formatWallet = (wallet: string) => {
        return isMobile ? wallet.substring(0, 4) + '...' + wallet.substring(wallet.length - 4) : wallet;
    };

    const onWalletLink = () => {
        if (!isConnected || !address) {
            displayErrorToast('Connect your wallet first');
            return;
        }

        const chain = WalletChain.Polygon;
        setSigning(true);

        createNonceMutation.mutate(
            { chain: chain, wallet: address },
            {
                onSuccess: async (nonce) => {
                    const signature = await signMessage({
                        message: nonce,
                    }).catch(() => setSigning(false));

                    if (signature) {
                        verifySignatureMutation.mutate(
                            { chain: chain, signature: signature },
                            {
                                onSettled: () => {
                                    setSigning(false);
                                },
                            },
                        );
                    }
                },
            },
        );
    };

    return (
        <Box sx={{ margin: '8px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <img
                alt={'polygon-icon'}
                src={polygonIconUrl}
                style={{ width: '20px', height: '20px', marginRight: '6px' }}
            />
            <Typography>Polygon</Typography>
            <Typography sx={{ flexGrow: 1 }} />
            {user.getWalletAddress(WalletChain.Polygon) === '' ? (
                <TertiaryButton size={'small'} loading={signing} onClick={onWalletLink}>
                    Link wallet
                </TertiaryButton>
            ) : (
                <>
                    <FadingTooltip title={'Unlink Wallet'} placement={'top'}>
                        <IconButton
                            onClick={() => setUnlinkingChain('polygon')}
                            sx={{
                                marginRight: '12px',
                                padding: '0 2px',
                                borderRadius: '6px',
                                '&:hover': { background: 'transparent' },
                            }}
                        >
                            <LinkOffOutlinedIcon
                                sx={(theme) => ({ '&:hover': { color: theme.palette.error.light } })}
                            />
                        </IconButton>
                    </FadingTooltip>
                    <Typography>{formatWallet(user.getWalletAddress(WalletChain.Polygon))}</Typography>
                </>
            )}
            <UnlinkWalletConfirmationDialog
                chain={unlinkingChain}
                open={!!unlinkingChain}
                handleClose={() => setUnlinkingChain(null)}
            />
        </Box>
    );
};
