import { FlipBotGlobalRaidingConfig, FlipBotGlobalRaidingConfigUpdateDto } from '@flipguard/webapp-api';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalRaidingSettingsUpdateMutation } from '../../../../api/mutations/flipbot-global-config';
import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomNumericTextField } from '../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { displaySuccessToast } from '../../../../utils/toasts';

type Props = {
    settings: FlipBotGlobalRaidingConfig;
};

export const AdminPanelRaidingSettingsCard = ({ settings }: Props) => {
    const updateMutation = useGlobalRaidingSettingsUpdateMutation();

    const [expPerRaid, setExpPerRaid] = useState(settings.expPerRaid);

    const saveDisabled = expPerRaid === settings.expPerRaid;

    const onSave = () => {
        const dto: FlipBotGlobalRaidingConfigUpdateDto = {
            expPerRaid: expPerRaid,
        };

        updateMutation.mutate(dto, {
            onSuccess: () => {
                displaySuccessToast('BattleGround settings has been updated');
            },
        });
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '8px 16px 8px 16px',
            }}
        >
            <Typography sx={{ margin: '8px' }} variant={'h6'}>
                Experience
            </Typography>
            <CustomNumericTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                label={'Experience per raid'}
                value={expPerRaid}
                onValueChange={setExpPerRaid}
                minValue={0}
                maxValue={1000}
                adornment={'EXP'}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PrimaryButton
                    sx={{ margin: '16px 8px 8px 8px' }}
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveOutlinedIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
