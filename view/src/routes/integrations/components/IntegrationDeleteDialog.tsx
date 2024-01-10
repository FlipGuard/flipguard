import { Integration } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText, Divider } from '@mui/material';
import React from 'react';

import { useIntegrationDeleteMutation } from '../../../api/mutations/integrations';
import { ConfirmDialog } from '../../../components/atoms/feedback/dialog/ConfirmDialog';
import { AffectedBotsDialogBox } from '../../../components/molecules/utils/AffectedBotsDialogBox';
import { useAuth } from '../../../hooks/use-auth';

type Props = {
    integration: Integration;
    open: boolean;
    handleClose: () => void;
};

export const IntegrationDeleteDialog = ({ integration, open, handleClose }: Props) => {
    const { user } = useAuth();
    const deleteMutation = useIntegrationDeleteMutation();

    const onDelete = () => {
        deleteMutation.mutate(integration.id, {
            onSettled: () => handleClose(),
        });
    };

    const affectedBots = Object.values(user.metadata.bots)
        .filter((bot) => bot.usedIntegrations.includes(integration.id))
        .map((bot) => bot.name);

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Delete "${integration.id}"?`}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                Deleting this integration will not cause already running bots to break, but you will not be able to
                restart them without replacing this integration in their config with another one first.
            </DialogContentText>
            <Divider sx={{ margin: '16px 0' }} />
            <AffectedBotsDialogBox affectedBots={affectedBots} />
        </ConfirmDialog>
    );
};
