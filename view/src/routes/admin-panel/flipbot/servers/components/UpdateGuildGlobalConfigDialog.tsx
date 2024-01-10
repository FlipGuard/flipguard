import { FlipBotGlobalGuildConfig, FlipBotGlobalGuildsConfigUpdateDto } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalGuildSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-global-config';
import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomSwitch } from '../../../../../components/atoms/inputs/switch/CustomSwitch';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';

type Props = {
    settings: FlipBotGlobalGuildConfig;
    isOpen: boolean;
    onClose: () => void;
};

export const UpdateGuildGlobalConfigDialog = ({ settings: originalSettings, isOpen, onClose }: Props) => {
    const isMobile = isViewMobile();

    const updateMutation = useGlobalGuildSettingsUpdateMutation();

    const [verified, setVerified] = useState(originalSettings.verified);

    const onUpdate = () => {
        const dto: FlipBotGlobalGuildsConfigUpdateDto = { verified };

        updateMutation.mutate(
            { guildId: originalSettings.guildId, dto: dto },
            {
                onSuccess: onClose,
            },
        );
    };

    const updateDisabled = verified === originalSettings.verified;

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '500px' } }}
        >
            <CustomDialogTitle>
                Update server config
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <CustomSwitch
                    sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                    label={'Verified'}
                    labelPlacement={'start'}
                    checked={verified}
                    onChange={setVerified}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton disabled={updateDisabled} onClick={onUpdate} loading={updateMutation.isLoading}>
                    Update
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
