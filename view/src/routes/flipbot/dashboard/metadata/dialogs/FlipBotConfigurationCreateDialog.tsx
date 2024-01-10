import { FlipBotGuildConfigCreateDto } from '@flipguard/webapp-api';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGuildConfigCreateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { CustomDialog } from '../../../../../components/atoms/feedback/dialog/CustomDialog';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import { useFlipBotContext } from '../../../../../contexts/flipbot-context';
import { useTeamContext } from '../../../../../contexts/team-context';
import { useAuth } from '../../../../../hooks/use-auth';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const FlipBotConfigurationCreateDialog = ({ isOpen, onClose }: Props) => {
    const { user } = useAuth();
    const { scopedTeam } = useTeamContext();
    const { setScopedConfig } = useFlipBotContext();

    const createGuildConfigMutation = useGuildConfigCreateMutation();

    const [name, setName] = useState('');

    const onCreate = () => {
        const dto: FlipBotGuildConfigCreateDto = {
            name: name,
            teamId: scopedTeam?.id,
        };

        createGuildConfigMutation.mutate(dto, {
            onSuccess: (createdGuildConfig) => {
                setScopedConfig(createdGuildConfig.id);
                onClose();
            },
        });
    };

    return (
        <CustomDialog open={isOpen} onClose={onClose}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 6px 12px 12px',
                    wordBreak: 'break-word',
                }}
            >
                Create new FlipSuite Configuration
                <Typography sx={{ flexGrow: 1 }} />
                <IconButton sx={{ marginLeft: '4px' }} onClick={onClose}>
                    <ClearOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ padding: '12px 12px 12px 12px' }}>
                <CustomTextField
                    name={'Configuration name'}
                    label={'Configuration name'}
                    sx={{ width: '100%', marginTop: '8px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 128 }}
                />
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={onClose}>Cancel</TertiaryButton>
                <PrimaryButton
                    disabled={user.flipBotConfigs.length >= 3}
                    disableOnNoAuth={true}
                    loading={createGuildConfigMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onCreate}
                >
                    Create
                </PrimaryButton>
            </DialogActions>
        </CustomDialog>
    );
};
