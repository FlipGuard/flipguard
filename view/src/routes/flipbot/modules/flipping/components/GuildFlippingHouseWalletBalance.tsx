import { FlipBotModuleFlippingSettings, FlipBotTokens, SUPPORTED_FLIPBOT_TOKENS } from '@flipguard/webapp-api';
import { Box, BoxProps, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useBalance } from 'wagmi';
import { polygon } from 'wagmi/chains';

import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { DepositDialog } from '../../../../../components/molecules/dialogs/DepositDialog';
import { WithdrawDialog } from '../../../../../components/molecules/dialogs/WithdrawDialog';
import { InputLikeBox } from '../../../../../components/molecules/utils/InputLikeBox';
import { WalletBalanceBox } from '../../../../../components/organisms/wallets/WalletBalanceBox';

const WITHDRAWAL_MIN_COOLDOWN = 5 * 60 * 1000;

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

type Props = BoxProps & {
    config: FlipBotModuleFlippingSettings;
};

export const GuildFlippingHouseWalletBalance = ({ config, ...boxProps }: Props) => {
    const address = config.houseWallet?.address ?? '';

    const [depositDialogOpened, setDepositDialogOpened] = useState(false);
    const [withdrawDialogOpened, setWithdrawDialogOpened] = useState(false);

    const supportedTokens = ['MATIC', ...Object.keys(config.flippingAmounts)];
    const tokensToShow = SUPPORTED_FLIPBOT_TOKENS.filter((tk) => supportedTokens.includes(tk));

    const balances = tokensToShow.map((tk) => {
        const token = FlipBotTokens[tk];

        const query = useBalance({
            address: address as `0x${string}`,
            chainId: polygon.id,
            enabled: !!address,
            token: token.contract ? (token.contract as `0x${string}`) : undefined,
            formatUnits: token.decimals,
        });

        return query.data;
    });

    const [withdrawDisabled, reason] = (() => {
        if (config.enabled) {
            return [true, 'You cannot withdraw funds from the house wallet while the flipping bot is enabled'];
        } else if (config.enabledUpdatedAt + WITHDRAWAL_MIN_COOLDOWN > Date.now()) {
            const secondsLeft = Math.floor((config.enabledUpdatedAt + WITHDRAWAL_MIN_COOLDOWN - Date.now()) / 1000);
            return [true, `You cannot withdraw funds yet. House will unlock in ${secondsLeft} second(s)`];
        } else {
            return [!config.houseWallet, ''];
        }
    })();

    return (
        <Container {...boxProps}>
            <InputLikeBox label={'Address'} sx={{ minHeight: '40px', margin: '8px', padding: '8px 12px' }}>
                <Typography sx={{ lineBreak: 'anywhere' }}>{address || '-'}</Typography>
            </InputLikeBox>
            <InputLikeBox label={'Balance'} sx={{ margin: '8px', padding: '8px 12px' }}>
                {tokensToShow.map((tk, idx) => (
                    <WalletBalanceBox
                        key={idx}
                        sx={{ padding: '2px 0' }}
                        balance={Number(balances[idx]?.formatted ?? 0)}
                        symbol={tk}
                    />
                ))}
            </InputLikeBox>
            <Box sx={{ margin: '4px 8px', display: 'flex', justifyContent: 'flex-end' }}>
                <TertiaryButton
                    disabled={withdrawDisabled}
                    tooltipMessage={reason}
                    tooltipPlacement={'top'}
                    onClick={() => setWithdrawDialogOpened(true)}
                >
                    Withdraw
                </TertiaryButton>
                <TertiaryButton
                    sx={{ marginLeft: '6px' }}
                    disabled={!address}
                    onClick={() => setDepositDialogOpened(true)}
                >
                    Deposit
                </TertiaryButton>
            </Box>
            <DepositDialog
                open={depositDialogOpened}
                handleClose={() => setDepositDialogOpened(false)}
                recipient={address}
                options={tokensToShow.map((tk) => FlipBotTokens[tk])}
            />
            <WithdrawDialog
                open={withdrawDialogOpened}
                handleClose={() => setWithdrawDialogOpened(false)}
                balance={Object.fromEntries(tokensToShow.map((tk, idx) => [tk, Number(balances[idx]?.formatted ?? 0)]))}
                privateKey={config.houseWallet?.pkey ?? ''}
                options={tokensToShow.map((tk) => FlipBotTokens[tk])}
            />
        </Container>
    );
};
