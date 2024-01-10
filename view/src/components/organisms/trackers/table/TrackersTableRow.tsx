import { BotGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Box, Divider, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotStartMutation, useBotStopMutation } from '../../../../api/mutations/tracking-bots';
import { RoutePath } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { formatTimeAgo, formatTimeSince } from '../../../../utils/timestamps';
import { isBotInBrokenState } from '../../../../utils/tracking-bots';
import { FadingTooltip } from '../../../atoms/feedback/tooltip/FadingTooltip';
import { LoadingIconButton } from '../../../atoms/inputs/button/LoadingIconButton';
import { ActionMenu } from '../../../atoms/navigation/menu/ActionMenu';
import { CustomTableCell, CustomTableRow } from '../../../molecules/table/CustomTable';
import { BotConfigTypeChangeDialog } from '../edit/BotConfigTypeChangeDialog';
import { BotDeleteDialog } from '../form/BotDeleteDialog';
import { BotStatusChip } from '../form/BotsStatusChips';

type Props = {
    bot: BotGetDto;
    editRoute: RoutePath;
};

export const TrackersTableRow = ({ bot, editRoute }: Props) => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const startBotMutation = useBotStartMutation();
    const stopBotMutation = useBotStopMutation();

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [convertDialogOpen, setConvertDialogOpen] = useState<boolean>(false);

    const start = () => {
        startBotMutation.mutate(bot.id);
    };

    const stop = () => {
        stopBotMutation.mutate(bot.id);
    };

    const activeSinceTime = bot.activeSince === -1 ? '-' : formatTimeSince(bot.activeSince);
    const updatedAtTime = formatTimeAgo(bot.updatedAt, true);
    const isInBrokenState = isBotInBrokenState(bot, user);

    const menuOptions = [
        {
            icon: EditOutlinedIcon,
            name: 'Edit',
            callback: () => setLocation(editRoute + '/' + bot.id),
        },
        {
            icon: SmartToyOutlinedIcon,
            name: 'Convert',
            callback: () => setConvertDialogOpen(true),
            hide: isInBrokenState,
        },
        {
            icon: DeleteOutlineOutlinedIcon,
            name: 'Delete',
            callback: () => setDeleteDialogOpen(true),
        },
    ];

    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isInBrokenState && (
                        <FadingTooltip title={'Your bot is in a broken state'} placement={'top'}>
                            <ErrorOutlineOutlinedIcon sx={{ marginRight: '8px', color: '#d73434' }} />
                        </FadingTooltip>
                    )}
                    {bot.name}
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <BotStatusChip active={bot.active} />
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
                        <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
                            <MoreVertOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CustomTableCell>
            <ActionMenu menuAnchor={menuAnchor} onClose={() => setMenuAnchor(null)} actions={menuOptions} />
            <BotDeleteDialog bot={bot} open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} />
            <BotConfigTypeChangeDialog
                bot={bot}
                open={convertDialogOpen}
                handleClose={() => setConvertDialogOpen(false)}
            />
        </CustomTableRow>
    );
};
