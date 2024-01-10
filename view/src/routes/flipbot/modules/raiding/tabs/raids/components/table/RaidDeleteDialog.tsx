import { withNoSpacing } from '@flipguard/commons';
import { TwitterRaid } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText } from '@mui/material';
import React from 'react';

import { useDeleteRaidMutation } from '../../../../../../../../api/mutations/flipbot-modules-raiding';
import { ConfirmDialog } from '../../../../../../../../components/atoms/feedback/dialog/ConfirmDialog';
import { displaySuccessToast } from '../../../../../../../../utils/toasts';

type Props = {
    raid: TwitterRaid;
    configId: string;
    isOpen: boolean;
    onClose: () => void;
};

export const RaidDeleteDialog = ({ raid, configId, isOpen, onClose }: Props) => {
    const deleteMutation = useDeleteRaidMutation();

    const onDelete = () => {
        deleteMutation.mutate(
            { configId: configId, raidId: raid.id },
            {
                onSettled: onClose,
                onSuccess: () => {
                    displaySuccessToast('Raid has been deleted successfully');
                },
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Delete Raid?'}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                {withNoSpacing(`
                    Are you sure you want to delete the "${raid.title}" raid? If the raid is ongoing and rewards 
                    weren't distributed yet to some raiders it will prevent them from claiming them.
                `)}
            </DialogContentText>
        </ConfirmDialog>
    );
};
