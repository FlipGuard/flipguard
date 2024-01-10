import { BurnerWalletIntegration } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText, Divider } from '@mui/material';
import React from 'react';

import { useIntegrationDeleteMutation } from '../../api/mutations/integrations';
import { ConfirmDialog } from '../../components/atoms/feedback/dialog/ConfirmDialog';
import { AffectedBotsDialogBox } from '../../components/molecules/utils/AffectedBotsDialogBox';
import { useAuth } from '../../hooks/use-auth';

type Props = {
    burner: BurnerWalletIntegration;
    open: boolean;
    handleClose: () => void;
};

export const BurnerDeleteDialog = ({ burner, open, handleClose }: Props) => {
    const { user } = useAuth();
    const deleteMutation = useIntegrationDeleteMutation();

    const onDelete = () => {
        deleteMutation.mutate(burner.id, {
            onSettled: () => handleClose(),
        });
    };

    const affectedBots = Object.values(user.metadata.bots)
        .filter((bot) => bot.usedIntegrations.includes(burner.id))
        .map((bot) => bot.name);

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Delete "${burner.id}"?`}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                Deleting this burner will not cause already running bots to break, but you will not be able to restart
                them without replacing this burner in their config with another one first.
            </DialogContentText>
            <Divider sx={{ margin: '16px 0' }} />
            <AffectedBotsDialogBox affectedBots={affectedBots} />
        </ConfirmDialog>
    );
};
