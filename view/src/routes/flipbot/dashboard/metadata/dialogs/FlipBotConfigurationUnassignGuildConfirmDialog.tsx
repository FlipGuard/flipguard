import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import { DialogContentText } from '@mui/material';
import React from 'react';

import { useGuildConfigUnassignGuildMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { ConfirmDialog } from '../../../../../components/atoms/feedback/dialog/ConfirmDialog';

type Props = {
    configId: string;
    isOpen: boolean;
    onClose: () => void;
};

export const FlipBotUnassignGuildConfirmDialog = ({ configId, isOpen, onClose }: Props) => {
    const unassignMutation = useGuildConfigUnassignGuildMutation();

    const onUnassign = () => {
        unassignMutation.mutate(configId, {
            onSettled: onClose,
        });
    };

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Diconnect FlipSuite config from the server?'}
            actionName={'Disconnect'}
            actionIcon={LinkOffOutlinedIcon}
            actionCallback={onUnassign}
            isActionLoading={unassignMutation.isLoading}
            isDanger={true}
        >
            <DialogContentText>
                {'FlipSuite will stop working on your server until you connect some other configuration again'}
            </DialogContentText>
        </ConfirmDialog>
    );
};
