import { FlipBotGlobalGuildsConfigUpdateDto, getDefaultFlipBotGlobalGuildConfig } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalGuildSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-global-config';
import { CustomDialog, CustomDialogTitle } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';

type Props = {
    existingGuildIds: string[];
    isOpen: boolean;
    onClose: () => void;
};

export const AddGuildGlobalConfigDialog = ({ existingGuildIds, isOpen, onClose }: Props) => {
    const isMobile = isViewMobile();

    const updateMutation = useGlobalGuildSettingsUpdateMutation();

    const [guildId, setGuildId] = useState('');

    const isDuplicate = existingGuildIds.includes(guildId);

    const handleClose = () => {
        onClose();
        setGuildId('');
    };

    const onAdd = () => {
        const dto: FlipBotGlobalGuildsConfigUpdateDto = {
            ...getDefaultFlipBotGlobalGuildConfig(guildId),
        };

        updateMutation.mutate(
            { guildId: guildId, dto: dto },
            {
                onSuccess: handleClose,
            },
        );
    };

    return (
        <CustomDialog
            open={isOpen}
            onClose={handleClose}
            sx={{ '& .MuiPaper-root': { minWidth: isMobile ? 'auto' : '400px' } }}
        >
            <CustomDialogTitle>
                Add server
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={handleClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                <CustomTextField
                    sx={{ margin: '8px' }}
                    label={'Discord server ID'}
                    value={guildId}
                    onChange={(e) => setGuildId(e.target.value)}
                    error={isDuplicate}
                    helperText={isDuplicate ? 'Server config with this ID already exists' : undefined}
                    required
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: '16px' }}>
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <PrimaryButton onClick={onAdd} disabled={isDuplicate || !guildId} loading={updateMutation.isLoading}>
                    Add
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
