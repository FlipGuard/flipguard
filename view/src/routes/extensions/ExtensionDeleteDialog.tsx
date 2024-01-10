import { BotExtensionGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText, Divider } from '@mui/material';
import React from 'react';

import { useBotExtensionDeleteMutation } from '../../api/mutations/extensions';
import { ConfirmDialog } from '../../components/atoms/feedback/dialog/ConfirmDialog';
import { AffectedBotsDialogBox } from '../../components/molecules/utils/AffectedBotsDialogBox';
import { useAuth } from '../../hooks/use-auth';

type Props = {
    extension: BotExtensionGetDto;
    open: boolean;
    handleClose: () => void;
};

export const ExtensionDeleteDialog = ({ extension, open, handleClose }: Props) => {
    const { user } = useAuth();
    const deleteMutation = useBotExtensionDeleteMutation();

    const onDelete = () => {
        deleteMutation.mutate(extension.id, {
            onSettled: () => handleClose(),
        });
    };

    const affectedBots = Object.values(user.metadata.bots)
        .filter((bot) => bot.usedExtensions.includes(extension.id))
        .map((bot) => bot.name);

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Delete "${extension.id}"?`}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                Deleting this extension will not cause already running bots to break, but you will not be able to
                restart them without removing this extension from their config first.
            </DialogContentText>
            <Divider sx={{ margin: '16px 0' }} />
            <AffectedBotsDialogBox affectedBots={affectedBots} />
        </ConfirmDialog>
    );
};
