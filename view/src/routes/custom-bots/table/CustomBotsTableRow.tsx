import { BotGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Divider, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotStartMutation, useBotStopMutation } from '../../../api/mutations/tracking-bots';
import { LoadingIconButton } from '../../../components/atoms/inputs/button/LoadingIconButton';
import { CustomTableCell, CustomTableRow } from '../../../components/molecules/table/CustomTable';
import { BotDeleteDialog } from '../../../components/organisms/trackers/form/BotDeleteDialog';
import { BotStatusChip } from '../../../components/organisms/trackers/form/BotsStatusChips';
import { RoutePath } from '../../../config/constants/navigation';
import { formatTimeAgo, formatTimeSince } from '../../../utils/timestamps';
import { EventTypeChip } from '../../message-templates/chips/EventTypeChips';

type Props = {
    bot: BotGetDto;
};

export const CustomBotsTableRow = ({ bot }: Props) => {
    const [, setLocation] = useLocation();
    const startBotMutation = useBotStartMutation();
    const stopBotMutation = useBotStopMutation();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const start = () => {
        startBotMutation.mutate(bot.id);
    };

    const stop = () => {
        stopBotMutation.mutate(bot.id);
    };

    const activeSinceTime = bot.activeSince === -1 ? '-' : formatTimeSince(bot.activeSince);
    const updatedAtTime = formatTimeAgo(bot.updatedAt, true);

    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>{bot.name}</CustomTableCell>
            <CustomTableCell>
                <BotStatusChip active={bot.active} />
            </CustomTableCell>
            <CustomTableCell>
                <EventTypeChip type={bot.trigger} />
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
                            disabled={bot.active}
                            loading={!bot.active && startBotMutation.isLoading}
                        >
                            <PlayCircleFilledWhiteOutlinedIcon />
                        </LoadingIconButton>
                        <LoadingIconButton
                            onClick={stop}
                            disabled={!bot.active}
                            loading={bot.active && stopBotMutation.isLoading}
                        >
                            <StopCircleOutlinedIcon />
                        </LoadingIconButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'center'}>
                        <IconButton
                            sx={{ color: '#fff' }}
                            onClick={() => setLocation(RoutePath.CustomBotsEdit + '/' + bot.id)}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#fff' }} onClick={() => setDeleteDialogOpen(true)}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CustomTableCell>
            <BotDeleteDialog bot={bot} open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} />
        </CustomTableRow>
    );
};
