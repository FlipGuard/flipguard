import { MessageTemplate } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText, Divider } from '@mui/material';
import React from 'react';

import { useMessageTemplateDeleteMutation } from '../../api/mutations/message-templates';
import { ConfirmDialog } from '../../components/atoms/feedback/dialog/ConfirmDialog';
import { AffectedBotsDialogBox } from '../../components/molecules/utils/AffectedBotsDialogBox';
import { useAuth } from '../../hooks/use-auth';

type Props = {
    template: MessageTemplate;
    open: boolean;
    handleClose: () => void;
};

export const MessageTemplateDeleteDialog = ({ template, open, handleClose }: Props) => {
    const { user } = useAuth();
    const deleteMessageTemplateMutation = useMessageTemplateDeleteMutation();

    const onDelete = () => {
        deleteMessageTemplateMutation.mutate(template.id, {
            onSettled: () => handleClose(),
        });
    };

    const affectedBots = Object.values(user.metadata.bots)
        .filter((bot) => bot.usedTemplates.includes(template.id))
        .map((bot) => bot.name);

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Delete "${template.id}"?`}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteMessageTemplateMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                Deleting this template will not cause already running bots to break, but you will not be able to restart
                them without replacing this template in their config with another one first.
            </DialogContentText>
            <Divider sx={{ margin: '16px 0' }} />
            <AffectedBotsDialogBox affectedBots={affectedBots} />
        </ConfirmDialog>
    );
};
