import { BotGetDto } from '@flipguard/webapp-api';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { DialogContentText, Divider } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { useBotChangeTypeMutation } from '../../../../api/mutations/tracking-bots';
import { RoutePath } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { displayErrorToast } from '../../../../utils/toasts';
import { isBotInBrokenState } from '../../../../utils/tracking-bots';
import { ConfirmDialog } from '../../../atoms/feedback/dialog/ConfirmDialog';

type Props = {
    bot: BotGetDto;
    open: boolean;
    handleClose: () => void;
};

export const BotConfigTypeChangeDialog = ({ bot, open, handleClose }: Props) => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const convertMutation = useBotChangeTypeMutation();

    const onConvert = () => {
        if (isBotInBrokenState(bot, user)) {
            displayErrorToast('Cannot convert as your bot is in a broken state');
            return;
        }

        convertMutation.mutate(bot.id, {
            onSuccess: () => {
                setLocation(RoutePath.CustomBotsEdit + '/' + bot.id);
            },
        });
    };

    return (
        <ConfirmDialog
            isOpen={open}
            onClose={handleClose}
            title={`Convert to custom bot?`}
            actionName={'Convert'}
            actionIcon={SmartToyOutlinedIcon}
            actionCallback={onConvert}
            isActionLoading={convertMutation.isLoading}
        >
            <DialogContentText>
                Custom bots are configured using fluff - language that was crafted specifically for the purpose of
                creating NFT trackers, so it is much more powerful and flexible
            </DialogContentText>
            <Divider sx={{ margin: '16px 0' }} />
            <DialogContentText>
                This action is irreversible. Once you change your bot configuration type to custom you will not be able
                to configure this bot using wizard anymore.
            </DialogContentText>
        </ConfirmDialog>
    );
};
