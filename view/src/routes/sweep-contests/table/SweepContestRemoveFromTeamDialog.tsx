import { withNoSpacing } from '@flipguard/commons';
import { SweepContestGetDto, SweepContestMoveToTeamDto } from '@flipguard/webapp-api';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import { DialogContentText } from '@mui/material';
import React from 'react';

import { useSweepContestMoveToTeamMutation } from '../../../api/mutations/sweep-contests';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';
import { useTeamContext } from '../../../contexts/team-context';

type Props = {
    sweepContest: SweepContestGetDto;
    teamId: string;
    isOpen: boolean;
    onClose: () => void;
};

export const SweepContestRemoveFromTeamDialog = ({ sweepContest, teamId, isOpen, onClose }: Props) => {
    const { teams } = useTeamContext();

    const moveToTeamMutation = useSweepContestMoveToTeamMutation();

    const onMoveToTeam = () => {
        const dto: SweepContestMoveToTeamDto = { teamId: undefined };

        moveToTeamMutation.mutate(
            { sweepContestId: sweepContest.id, dto },
            {
                onSettled: onClose,
            },
        );
    };

    const teamName = teams.find((t) => t.id === teamId)?.name ?? '???';

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Remove Sweep Contest from a Team?'}
            actionName={'Remove'}
            actionIcon={MultipleStopOutlinedIcon}
            actionCallback={onMoveToTeam}
            isActionLoading={moveToTeamMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                {withNoSpacing(`
                    Are you sure you want to remove the "${sweepContest.name}" Sweep Contest from the "${teamName}" Team? 
                    Other members of the team will immediately lose their access to it.
                `)}
            </DialogContentText>
        </ConfirmDialog>
    );
};
