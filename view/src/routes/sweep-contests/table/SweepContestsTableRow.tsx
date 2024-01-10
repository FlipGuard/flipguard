import { SweepContestGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Box, Divider, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'wouter';

import { useSweepContestStartMutation, useSweepContestStopMutation } from '../../../api/mutations/sweep-contests';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { LoadingIconButton } from '../../../components/atoms/inputs/button/LoadingIconButton';
import { ActionMenu } from '../../../components/atoms/navigation/menu/ActionMenu';
import { CustomTableCell, CustomTableRow } from '../../../components/molecules/table/CustomTable';
import { UserAvatar } from '../../../components/molecules/users/UserAvatar';
import { RoutePath } from '../../../config/constants/navigation';
import { useTeamContext } from '../../../contexts/team-context';
import { useAuth } from '../../../hooks/use-auth';
import { SweepContestStatusChip } from '../chips/SweepContestStatusChips';
import { SweepContestDeleteDialog } from './SweepContestDeleteDialog';
import { SweepContestMoveToTeamDialog } from './SweepContestMoveToTeamDialog';
import { SweepContestRemoveFromTeamDialog } from './SweepContestRemoveFromTeamDialog';

type Props = {
    sweepContest: SweepContestGetDto;
};

export const SweepContestsTableRow = ({ sweepContest }: Props) => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const { scopedTeam } = useTeamContext();

    const startSweepContestMutation = useSweepContestStartMutation();
    const stopSweepContestMutation = useSweepContestStopMutation();

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isMoveToTeamDialogOpen, setIsMoveToTeamDialogOpen] = useState(false);
    const [isRemoveFromTeamDialogOpen, setIsRemoveFromTeamDialogOpen] = useState(false);

    const isOwner = sweepContest.userId === user.id;

    const start = () => {
        startSweepContestMutation.mutate(sweepContest.id);
    };

    const stop = () => {
        stopSweepContestMutation.mutate(sweepContest.id);
    };

    const menuOptions = [
        {
            icon: EditOutlinedIcon,
            name: 'Edit',
            callback: () => setLocation(RoutePath.SweepContestsEdit + '/' + sweepContest.id),
        },
        {
            icon: MultipleStopOutlinedIcon,
            name: 'Move to team',
            hide: !!sweepContest.teamId || !isOwner,
            callback: () => setIsMoveToTeamDialogOpen(true),
        },
        {
            icon: MultipleStopOutlinedIcon,
            name: 'Remove from Team',
            hide: !sweepContest.teamId || !isOwner,
            callback: () => setIsRemoveFromTeamDialogOpen(true),
        },
        {
            icon: DeleteOutlineOutlinedIcon,
            name: 'Delete',
            hide: !isOwner,
            callback: () => setDeleteDialogOpen(true),
        },
    ];

    const formatUtcTimestamp = (timestamp: number) => {
        const seconds = Math.floor(timestamp / 1000);
        const minuteRemainder = seconds % 60;
        return seconds - minuteRemainder;
    };

    const dateSettings: Intl.DateTimeFormatOptions = { timeStyle: 'short', dateStyle: 'short' };
    const startTime = Intl.DateTimeFormat(undefined, dateSettings).format(sweepContest.startTime);
    const endTime = Intl.DateTimeFormat(undefined, dateSettings).format(sweepContest.endTime);

    return (
        <CustomTableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {sweepContest.name}
                    {sweepContest.teamId && !scopedTeam && isOwner && (
                        <FadingTooltip title={'Belongs to a team'}>
                            <PeopleAltOutlinedIcon sx={{ width: '20px', height: '20px' }} />
                        </FadingTooltip>
                    )}
                    {sweepContest.teamId && scopedTeam && (
                        <UserAvatar userId={sweepContest.userId} tooltipPrefix={'Owned by'} />
                    )}
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <SweepContestStatusChip active={sweepContest.active} ended={sweepContest.ended} />
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {startTime}
                    <FadingTooltip
                        title={`UTC timestamp: ${formatUtcTimestamp(sweepContest.startTime)}`}
                        placement={'top'}
                    >
                        <PublicOutlinedIcon sx={{ marginLeft: '6px', fontSize: '18px' }} />
                    </FadingTooltip>
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {endTime}
                    <FadingTooltip
                        title={`UTC timestamp: ${formatUtcTimestamp(sweepContest.endTime)}`}
                        placement={'top'}
                    >
                        <PublicOutlinedIcon sx={{ marginLeft: '6px', fontSize: '18px' }} />
                    </FadingTooltip>
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    divider={<Divider sx={{ margin: '6px 8px' }} orientation="vertical" flexItem />}
                >
                    <Stack direction={'row'} justifyContent={'center'}>
                        <LoadingIconButton
                            onClick={start}
                            disabled={sweepContest.active || sweepContest.ended}
                            loading={!sweepContest.active && startSweepContestMutation.isLoading}
                        >
                            <PlayCircleFilledWhiteOutlinedIcon />
                        </LoadingIconButton>
                        <LoadingIconButton
                            onClick={stop}
                            disabled={!sweepContest.active || sweepContest.ended}
                            loading={sweepContest.active && stopSweepContestMutation.isLoading}
                        >
                            <StopCircleOutlinedIcon />
                        </LoadingIconButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'center'}>
                        <IconButton onClick={() => setLocation(RoutePath.SweepContests + '/' + sweepContest.id)}>
                            <LeaderboardOutlinedIcon sx={{ width: '24px', height: '24px' }} />
                        </IconButton>
                        <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
                            <MoreVertOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CustomTableCell>
            <ActionMenu menuAnchor={menuAnchor} onClose={() => setMenuAnchor(null)} actions={menuOptions} />
            <SweepContestDeleteDialog
                sweepContest={sweepContest}
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
            />
            <SweepContestMoveToTeamDialog
                sweepContest={sweepContest}
                isOpen={isMoveToTeamDialogOpen}
                onClose={() => setIsMoveToTeamDialogOpen(false)}
            />
            {sweepContest.teamId && (
                <SweepContestRemoveFromTeamDialog
                    sweepContest={sweepContest}
                    teamId={sweepContest.teamId}
                    isOpen={isRemoveFromTeamDialogOpen}
                    onClose={() => setIsRemoveFromTeamDialogOpen(false)}
                />
            )}
        </CustomTableRow>
    );
};
