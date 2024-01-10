import { BiddingBotGetDto } from '@flipguard/webapp-api';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Divider, IconButton, Stack } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { useBiddingBotStartMutation, useBiddingBotStopMutation } from '../../../api/mutations/bidding-bots';
import { LoadingIconButton } from '../../../components/atoms/inputs/button/LoadingIconButton';
import { CustomTableCell, CustomTableRow } from '../../../components/molecules/table/CustomTable';
import { RoutePath } from '../../../config/constants/navigation';
import { formatTimeAgo, formatTimeSince } from '../../../utils/timestamps';
import { BiddingBotsStatusChip } from '../chips/BiddingBotsStatusChips';

type Props = {
    bot: BiddingBotGetDto;
};

export const BiddingBotsTableRow = ({ bot }: Props) => {
    const [, setLocation] = useLocation();

    const startBotMutation = useBiddingBotStartMutation();
    const stopBotMutation = useBiddingBotStopMutation();

    const start = () => {
        startBotMutation.mutate(bot.id);
    };

    const stop = () => {
        stopBotMutation.mutate(bot.id);
    };

    const configured = bot.marketplaces && bot.marketplaces.OpenSea?.slug;
    const activeSinceTime = bot.activeSince === -1 ? '-' : formatTimeSince(bot.activeSince);
    const updatedAtTime = formatTimeAgo(bot.updatedAt, true);

    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>{bot.name}</CustomTableCell>
            <CustomTableCell>
                <BiddingBotsStatusChip bot={bot} />
            </CustomTableCell>
            <CustomTableCell>{activeSinceTime}</CustomTableCell>
            <CustomTableCell>{updatedAtTime}</CustomTableCell>
            <CustomTableCell>
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    divider={<Divider sx={{ margin: '6px 8px' }} orientation="vertical" flexItem />}
                >
                    <Stack direction={'row'} justifyContent={'center'}>
                        <LoadingIconButton
                            onClick={start}
                            disabled={bot.active || !configured}
                            loading={!bot.active && startBotMutation.isLoading}
                        >
                            <PlayCircleFilledWhiteOutlinedIcon />
                        </LoadingIconButton>
                        <LoadingIconButton
                            onClick={stop}
                            disabled={!bot.active || !configured}
                            loading={bot.active && stopBotMutation.isLoading}
                        >
                            <StopCircleOutlinedIcon />
                        </LoadingIconButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'center'}>
                        <IconButton
                            disabled={!configured}
                            sx={{ color: '#fff' }}
                            onClick={() => setLocation(RoutePath.BiddingBotsWallet + '/' + bot.id)}
                        >
                            <AccountBalanceWalletOutlinedIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: '#fff' }}
                            onClick={() => setLocation(RoutePath.BiddingBotsEdit + '/' + bot.id)}
                        >
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CustomTableCell>
        </CustomTableRow>
    );
};
