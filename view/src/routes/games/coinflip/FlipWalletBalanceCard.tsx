import { FlipBotTokens, FlipBotWithdrawRequestDto } from '@flipguard/webapp-api';
import { Box, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';

import { useWithdrawFundsFromFlipWalletMutation } from '../../../api/mutations/flipbot-core';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { DepositDialog } from '../../../components/molecules/dialogs/DepositDialog';
import { WithdrawDialog } from '../../../components/molecules/dialogs/WithdrawDialog';
import { InputLikeBox } from '../../../components/molecules/utils/InputLikeBox';
import { WalletBalanceBox } from '../../../components/organisms/wallets/WalletBalanceBox';
import { TokenInfo } from '../../../config/constants/tokens';
import { useAuth } from '../../../hooks/use-auth';
import { displayLoadingToast } from '../../../utils/toasts';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

type Props = {
    balances: Record<string, number>;
};

export const FlipWalletBalanceCard = ({ balances }: Props) => {
    const { flipProfile } = useAuth();
    const { address: recipient, isConnected } = useAccount();

    const withdrawMutation = useWithdrawFundsFromFlipWalletMutation();

    const [depositDialogOpened, setDepositDialogOpened] = useState(false);
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

    const tokensToShow = Object.keys(balances);

    const onWithdraw = async (amount: number, token: TokenInfo) => {
        if (!isConnected || !recipient) {
            return;
        }

        const dto: FlipBotWithdrawRequestDto = {
            token: token.symbol,
            amount: amount,
            recipient: recipient,
        };

        const toastId = displayLoadingToast(`Withdrawal in progress...`);
        withdrawMutation.mutate(dto, {
            onSettled: () => {
                toast.dismiss(toastId);
            },
        });
    };

    return (
        <Container>
            <InputLikeBox label={'My FlipWallet'} sx={{ minHeight: '40px', margin: '8px', padding: '8px 12px' }}>
                <Typography sx={{ lineBreak: 'anywhere' }}>{flipProfile.walletAddress || '-'}</Typography>
            </InputLikeBox>
            <InputLikeBox label={'My Balance'} sx={{ margin: '8px', padding: '8px 12px' }}>
                {tokensToShow.map((tk) => (
                    <WalletBalanceBox key={tk} sx={{ padding: '2px 0' }} balance={balances[tk]} symbol={tk} />
                ))}
            </InputLikeBox>
            <Box sx={{ margin: '4px 8px', display: 'flex', justifyContent: 'flex-end' }}>
                <TertiaryButton
                    disabled={!flipProfile.walletAddress || !isConnected}
                    onClick={() => setWithdrawDialogOpen(true)}
                    tooltipMessage={!isConnected ? 'Connect your wallet first' : ''}
                >
                    Withdraw
                </TertiaryButton>
                <TertiaryButton
                    sx={{ marginLeft: '6px' }}
                    disabled={!flipProfile.walletAddress}
                    onClick={() => setDepositDialogOpened(true)}
                >
                    Deposit
                </TertiaryButton>
            </Box>
            <DepositDialog
                open={depositDialogOpened}
                handleClose={() => setDepositDialogOpened(false)}
                recipient={flipProfile.walletAddress}
                options={tokensToShow.map((tk) => FlipBotTokens[tk])}
            />
            <WithdrawDialog
                open={withdrawDialogOpen}
                handleClose={() => setWithdrawDialogOpen(false)}
                balance={balances}
                options={tokensToShow.map((tk) => FlipBotTokens[tk])}
                customWithdrawFunction={onWithdraw}
                privateKey={''}
                isLoading={withdrawMutation.isLoading}
            />
        </Container>
    );
};
