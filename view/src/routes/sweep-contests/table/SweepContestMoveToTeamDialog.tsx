import { SweepContestGetDto, SweepContestMoveToTeamDto } from '@flipguard/webapp-api';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import { DialogContentText } from '@mui/material';
import React, { useState } from 'react';

import { useSweepContestMoveToTeamMutation } from '../../../api/mutations/sweep-contests';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';
import { CustomSelect } from '../../../components/atoms/inputs/select/CustomSelect';
import { useTeamContext } from '../../../contexts/team-context';

type Props = {
    sweepContest: SweepContestGetDto;
    isOpen: boolean;
    onClose: () => void;
};

export const SweepContestMoveToTeamDialog = ({ sweepContest, isOpen, onClose }: Props) => {
    const { teams } = useTeamContext();

    const moveToTeamMutation = useSweepContestMoveToTeamMutation();

    const [chosenTeamId, setChosenTeamId] = useState('');

    const onMoveToTeam = () => {
        const dto: SweepContestMoveToTeamDto = { teamId: chosenTeamId };

        moveToTeamMutation.mutate(
            { sweepContestId: sweepContest.id, dto },
            {
                onSettled: onClose,
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Move Sweep Contest to Team'}
            actionName={'Move'}
            actionIcon={MultipleStopOutlinedIcon}
            actionCallback={onMoveToTeam}
            isActionLoading={moveToTeamMutation.isLoading}
            disabled={!chosenTeamId}
        >
            <DialogContentText>
                {`Choose a team you want to move the "${sweepContest.name}" sweep contest to`}
            </DialogContentText>
            <CustomSelect
                sx={{ width: '100%', marginTop: '16px' }}
                label={'Team'}
                options={teams.map((t) => ({ label: t.name, value: t.id }))}
                onChange={(e) => setChosenTeamId(e.target.value)}
                value={chosenTeamId}
                disabled={teams.length === 0}
                select
            />
        </ConfirmDialog>
    );
};
