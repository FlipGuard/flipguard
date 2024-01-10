import { MarketplaceChains } from '@flipguard/domain';
import { BiddingBotWithdrawFundsDto } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import { ethers } from 'ethers';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';

import { withdrawFundsFromBiddingBot } from '../../../api/requests/bidding-bots';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { DepositDialog } from '../../../components/molecules/dialogs/DepositDialog';
import { WithdrawDialog } from '../../../components/molecules/dialogs/WithdrawDialog';
import { PolygonWalletBalanceBox } from '../../../components/organisms/wallets/PolygonWalletBalanceBox';
import { TokenInfo } from '../../../config/constants/tokens';
import { useAuth } from '../../../hooks/use-auth';
import { useTokensBalance } from '../../../hooks/use-tokens-balance';
import { displayErrorToast, displayLoadingToast, displaySuccessToast } from '../../../utils/toasts';

const CONNECT_WALLET_MSG = 'Connect your wallet first';
const RUNNING_BOT_MSG = "You cannot withdraw funds from the bot while it's is running";

type Props = {
    botId: string;
    walletAddress: string;
};

export const BalanceSection = ({ botId, walletAddress }: Props) => {
    const { user } = useAuth();
    const { address: recipient, isConnected } = useAccount();

    const { maticBalance, wethBalance, usdcBalance, refetchBalance } = useTokensBalance(walletAddress);

    const [depositDialogOpen, setDepositDialogOpen] = useState(false);
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

    const withdrawDisabled = user.isBiddingBotActive(botId);

    const depositTooltipMsg = !isConnected ? CONNECT_WALLET_MSG : '';
    const withdrawTooltipMsg = !isConnected ? CONNECT_WALLET_MSG : withdrawDisabled ? RUNNING_BOT_MSG : '';

    const onWithdraw = async (amount: number, token: TokenInfo) => {
        if (!isConnected || !recipient) {
            return;
        }

        const dto: BiddingBotWithdrawFundsDto = {
            chain: MarketplaceChains.POLYGON,
            native: !token.contract,
            erc20address: token.contract as string,
            amount: ethers.utils.parseUnits(amount.toString(), token.decimals).toString(),
            recipient: recipient as string,
        };

        let toastId;

        try {
            toastId = displayLoadingToast(`Withdrawal in progress...`);
            const { tx } = await withdrawFundsFromBiddingBot(botId, dto);
            await waitForTransaction({ hash: tx as `0x${string}`, confirmations: 3 });
            displaySuccessToast(`Successfully withdrawn ${amount} ${token.symbol}`);
        } catch (err) {
            const msg = (err as Error)?.message ?? 'Unknown';
            displayErrorToast(`Error: ${msg}`);
        } finally {
            toastId && toast.dismiss(toastId);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <PolygonWalletBalanceBox sx={{ margin: '0 8px' }} address={walletAddress} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: '8px 10px' }}>
                <FadingTooltip title={withdrawTooltipMsg} placement={'top'}>
                    <span>
                        <TertiaryButton
                            disabled={!isConnected || withdrawDisabled}
                            size={'small'}
                            onClick={() => setWithdrawDialogOpen(true)}
                        >
                            Withdraw
                        </TertiaryButton>
                    </span>
                </FadingTooltip>
                <Box sx={{ width: '8px' }} />
                <FadingTooltip title={depositTooltipMsg} placement={'top'}>
                    <span>
                        <TertiaryButton
                            disabled={!isConnected}
                            size={'small'}
                            onClick={() => setDepositDialogOpen(true)}
                        >
                            Deposit
                        </TertiaryButton>
                    </span>
                </FadingTooltip>
            </Box>
            <WithdrawDialog
                open={withdrawDialogOpen}
                handleClose={() => setWithdrawDialogOpen(false)}
                balance={{
                    MATIC: maticBalance,
                    WETH: wethBalance,
                    USDC: usdcBalance,
                }}
                customWithdrawFunction={onWithdraw}
                privateKey={''}
                refetchBalance={refetchBalance}
            />
            <DepositDialog
                open={depositDialogOpen}
                handleClose={() => setDepositDialogOpen(false)}
                recipient={walletAddress}
                refetchBurnerBalance={refetchBalance}
            />
        </Box>
    );
};
