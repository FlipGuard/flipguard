import { MarketplaceChains } from '@flipguard/domain';
import { BiddingBotWithdrawNftsDto } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { erc721ABI, useAccount, useContractRead } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';

import { withdrawNftsFromBiddingBot } from '../../../api/requests/bidding-bots';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { useAuth } from '../../../hooks/use-auth';
import { displayErrorToast, displayLoadingToast, displaySuccessToast } from '../../../utils/toasts';

const CONNECT_WALLET_MSG = 'Connect your wallet first';
const RUNNING_BOT_MSG = "You cannot withdraw NFTs from the bot while it's is running";

type Props = {
    botId: string;
    collectionAddress: string;
    walletAddress: string;
};

export const NftsSection = ({ botId, collectionAddress, walletAddress }: Props) => {
    const { user } = useAuth();
    const { address: recipient, isConnected } = useAccount();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data: collectionName } = useContractRead({
        address: collectionAddress as `0x${string}`,
        abi: erc721ABI,
        functionName: 'name',
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data: balance, refetch: refetchBalance } = useContractRead({
        address: collectionAddress as `0x${string}`,
        abi: erc721ABI,
        functionName: 'balanceOf',
        args: [walletAddress as `0x${string}`],
    });

    const [withdrawalInProgress, setWithdrawalInProgress] = useState(false);

    const withdrawDisabled = user.isBiddingBotActive(botId);

    const withdrawTooltipMsg = !isConnected ? CONNECT_WALLET_MSG : withdrawDisabled ? RUNNING_BOT_MSG : '';

    const onWithdraw = async () => {
        if (!isConnected || !recipient || Number(balance) <= 0) {
            return;
        }

        const dto: BiddingBotWithdrawNftsDto = {
            chain: MarketplaceChains.POLYGON,
            collection: collectionAddress,
            recipient: recipient,
        };

        setWithdrawalInProgress(true);
        let toastId;

        try {
            toastId = displayLoadingToast(`Withdrawal in progress...`);
            const { txs } = await withdrawNftsFromBiddingBot(botId, dto);
            await Promise.all(txs.map((tx) => waitForTransaction({ hash: tx as `0x${string}`, confirmations: 3 })));
            displaySuccessToast(`Successfully withdrawn ${txs.length} NFTs`);
            await refetchBalance();
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown';
            displayErrorToast(`Error: ${msg}`);
        } finally {
            toastId && toast.dismiss(toastId);
            setWithdrawalInProgress(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
            }}
        >
            <Box sx={{ marginTop: '-5px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: '8px',
                    }}
                >
                    <Typography>Collection</Typography>
                    <Typography>{collectionName ?? '?'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px' }}>
                    <Typography>Quantity</Typography>
                    <Typography>{balance ? Number(balance) : 0}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: '8px' }}>
                <FadingTooltip title={withdrawTooltipMsg} placement={'top'}>
                    <span>
                        <TertiaryButton
                            loading={withdrawalInProgress}
                            disabled={Number(balance) <= 0 || !isConnected}
                            size={'small'}
                            onClick={onWithdraw}
                        >
                            Withdraw
                        </TertiaryButton>
                    </span>
                </FadingTooltip>
            </Box>
        </Box>
    );
};
