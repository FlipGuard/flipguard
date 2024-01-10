import { withNoSpacing } from '@flipguard/commons';
import { FlipBotGuildConfigGetDto } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DialogContentText } from '@mui/material';
import React from 'react';

import { useGuildConfigDeleteMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { ConfirmDialog } from '../../../../../components/atoms/feedback/dialog/ConfirmDialog';

type Props = {
    config: FlipBotGuildConfigGetDto;
    isOpen: boolean;
    onClose: () => void;
};

export const FlipBotConfigurationDeleteDialog = ({ config, isOpen, onClose }: Props) => {
    const deleteMutation = useGuildConfigDeleteMutation();

    const onDelete = () => {
        deleteMutation.mutate(
            { configId: config.id },
            {
                onSettled: onClose,
            },
        );
    };

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Delete FlipSuite Configuration?'}
            actionName={'Delete'}
            actionIcon={DeleteOutlineOutlinedIcon}
            actionCallback={onDelete}
            isActionLoading={deleteMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                {withNoSpacing(`
                    Are you sure you want to delete the "${config.name}" FlipSuite Configuration? 
                    FlipSuite will stop working on your server until you connect some other configuration again.
                `)}
            </DialogContentText>
        </ConfirmDialog>
    );
};
