import { FlipBotModuleRaidingSettings, FlipBotModuleRaidingSettingsUpdateDto } from '@flipguard/webapp-api';
import SaveIcon from '@mui/icons-material/Save';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useRaidingModuleSettingsUpdateMutation } from '../../../../../../api/mutations/flipbot-guild-configs';
import { PrimaryButton } from '../../../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomSwitch } from '../../../../../../components/atoms/inputs/switch/CustomSwitch';
import { HeaderBox } from '../../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../../utils/toasts';

type Props = {
    configId: string;
    config: FlipBotModuleRaidingSettings;
};

export const RaidingSettingsTab = ({ configId, config }: Props) => {
    const updateMutation = useRaidingModuleSettingsUpdateMutation();

    const [enabled, setEnabled] = useState(config.enabled);

    const onSave = () => {
        const dto: FlipBotModuleRaidingSettingsUpdateDto = {
            enabled: enabled,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => displaySuccessToast('Settings has been updated'),
            },
        );
    };

    const saveDisabled = enabled === config.enabled;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <SettingsOutlinedIcon />
                <HeaderText>{'Settings'}</HeaderText>
            </HeaderBox>
            <CustomSwitch
                sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                label={'Module enabled'}
                labelPlacement={'start'}
                checked={enabled}
                onChange={setEnabled}
                disabled={updateMutation.isLoading}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
