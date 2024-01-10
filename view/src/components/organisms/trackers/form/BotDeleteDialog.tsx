import { BotGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText } from '@mui/material';
import React from 'react';

import { useBotDeleteMutation } from '../../../../api/mutations/tracking-bots';
import { ConfirmDialog } from '../../../atoms/feedback/dialog/ConfirmDialog';

type Props = {
    bot: BotGetDto;
    open: boolean;
    handleClose: () => void;
};

export const BotDeleteDialog = ({ bot, open, handleClose }: Props) => {
    const deleteBotMutation = useBotDeleteMutation();

    const onDelete = () => {
        deleteBotMutation.mutate(
            { botId: bot.id, botName: bot.name },
            {
                onSettled: () => handleClose(),
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Delete "${bot.name}"?`}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteBotMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>Are you sure?</DialogContentText>
        </ConfirmDialog>
    );
};
