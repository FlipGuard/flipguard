import { SweepContestGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText } from '@mui/material';
import React from 'react';

import { useSweepContestDeleteMutation } from '../../../api/mutations/sweep-contests';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';

type Props = {
    sweepContest: SweepContestGetDto;
    open: boolean;
    handleClose: () => void;
};

export const SweepContestDeleteDialog = ({ sweepContest, open, handleClose }: Props) => {
    const deleteSweepContestMutation = useSweepContestDeleteMutation();

    const onDelete = () => {
        deleteSweepContestMutation.mutate(
            { sweepContestId: sweepContest.id, sweepContestName: sweepContest.name },
            {
                onSettled: () => handleClose(),
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Delete "${sweepContest.name}"?`}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteSweepContestMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                Deleting this sweep contest will remove its leaderboard completely, so make sure that you saved the
                results, or that they are not needed anymore
            </DialogContentText>
        </ConfirmDialog>
    );
};
