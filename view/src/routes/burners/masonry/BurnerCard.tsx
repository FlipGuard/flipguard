import { BurnerWalletIntegration } from '@flipguard/webapp-api';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Wallet } from 'ethers';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useLocation } from 'wouter';

import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { DepositDialog } from '../../../components/molecules/dialogs/DepositDialog';
import { WithdrawDialog } from '../../../components/molecules/dialogs/WithdrawDialog';
import { PolygonWalletBalanceBox } from '../../../components/organisms/wallets/PolygonWalletBalanceBox';
import { RoutePath } from '../../../config/constants/navigation';
import { useAuth } from '../../../hooks/use-auth';
import { useTokensBalance } from '../../../hooks/use-tokens-balance';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { formatTimeAgo } from '../../../utils/timestamps';
import { BurnerDeleteDialog } from '../BurnerDeleteDialog';

const CONNECT_WALLET_MSG = 'Connect your wallet first';
const RUNNING_BOT_MSG = 'You cannot withdraw funds from the wallet while it is used in a running bot';

type Props = {
    burner: BurnerWalletIntegration;
};

const BurnerCardComponent = ({ burner }: Props) => {
    const { user } = useAuth();
    const isMobile = isViewMobile('sm');
    const [, setLocation] = useLocation();

    const publicAddress = new Wallet('0x' + burner.value.privateKey).address;
    const formattedAddress = isMobile
        ? publicAddress.substring(0, 8) + '...' + publicAddress.substring(publicAddress.length - 8)
        : publicAddress;

    const { isConnected } = useAccount();
    const { maticBalance, wethBalance, usdcBalance, refetchBalance } = useTokensBalance(publicAddress);

    const [depositDialogOpened, setDepositDialogOpened] = useState(false);
    const [withdrawDialogOpened, setWithdrawDialogOpened] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const usedInActiveBot =
        Object.values(user.metadata.bots)
            .filter((bot) => bot.usedIntegrations.includes(burner.id))
            .find((bot) => bot.active) !== undefined;

    const depositTooltipMsg = !isConnected ? CONNECT_WALLET_MSG : '';
    const withdrawTooltipMsg = !isConnected ? CONNECT_WALLET_MSG : usedInActiveBot ? RUNNING_BOT_MSG : '';

    return (
        <Card>
            <CardContent sx={{ marginTop: '-6px', marginBottom: '-18px', wordBreak: 'break-word' }}>
                <Typography variant={'h6'}>{burner.id}</Typography>
                <Typography sx={{ fontSize: '13px', color: '#aaa' }} gutterBottom>
                    {`Address: ${formattedAddress}`}
                </Typography>
            </CardContent>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#444', margin: '8px 16px' }} />
            <CardMedia
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 16px',
                }}
            >
                <PolygonWalletBalanceBox sx={{ width: '100%' }} address={publicAddress} />
            </CardMedia>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '-4px',
                }}
            >
                <Box sx={{ paddingLeft: '8px' }}>
                    <Typography
                        sx={(theme) => ({ fontSize: '12px', color: theme.palette.tertiaryButton.dark })}
                    >{`Updated ${formatTimeAgo(burner.updatedAt, false)}`}</Typography>
                </Box>
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    divider={<Divider sx={{ margin: '6px 8px' }} orientation="vertical" flexItem />}
                >
                    <Stack direction={'row'} justifyContent={'center'}>
                        <FadingTooltip title={depositTooltipMsg} placement={'top'}>
                            <span>
                                <IconButton onClick={() => setDepositDialogOpened(true)} disabled={!isConnected}>
                                    <AddCircleOutlineOutlinedIcon />
                                </IconButton>
                            </span>
                        </FadingTooltip>
                        <FadingTooltip title={withdrawTooltipMsg} placement={'top'}>
                            <span>
                                <IconButton
                                    onClick={() => setWithdrawDialogOpened(true)}
                                    disabled={!isConnected || usedInActiveBot}
                                >
                                    <RemoveCircleOutlineOutlinedIcon />
                                </IconButton>
                            </span>
                        </FadingTooltip>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'center'}>
                        <IconButton onClick={() => setLocation(RoutePath.BurnersEdit + '/' + burner.id)}>
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => setDeleteDialogOpen(true)}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardActions>
            <BurnerDeleteDialog
                burner={burner}
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
            />
            <WithdrawDialog
                open={withdrawDialogOpened}
                handleClose={() => setWithdrawDialogOpened(false)}
                balance={{
                    MATIC: maticBalance,
                    WETH: wethBalance,
                    USDC: usdcBalance,
                }}
                privateKey={burner.value.privateKey}
                refetchBalance={refetchBalance}
            />
            <DepositDialog
                open={depositDialogOpened}
                handleClose={() => setDepositDialogOpened(false)}
                recipient={publicAddress}
                refetchBurnerBalance={refetchBalance}
            />
        </Card>
    );
};

export const BurnerCard = React.memo(BurnerCardComponent, (prev: Props, next: Props) => {
    return equal(prev.burner, next.burner);
});
