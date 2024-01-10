import { FlipBotGlobalRumbleConfig, FlipBotGlobalRumbleConfigUpdateDto } from '@flipguard/webapp-api';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalRumbleSettingsUpdateMutation } from '../../../../api/mutations/flipbot-global-config';
import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomNumericTextField } from '../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { displaySuccessToast } from '../../../../utils/toasts';

type Props = {
    settings: FlipBotGlobalRumbleConfig;
};

export const AdminPanelRumbleSettingsCard = ({ settings }: Props) => {
    const updateMutation = useGlobalRumbleSettingsUpdateMutation();

    const [expPerKill, setExpPerKill] = useState(settings.expPerKill);
    const [expPerPlayerForWin, setExpPerPlayerForWin] = useState(settings.expPerPlayerForWin);

    const saveDisabled = expPerKill === settings.expPerKill && expPerPlayerForWin === settings.expPerPlayerForWin;

    const onSave = () => {
        const dto: FlipBotGlobalRumbleConfigUpdateDto = {
            expPerKill: expPerKill,
            expPerPlayerForWin: expPerPlayerForWin,
            lines: settings.lines,
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <CustomNumericTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    label={'Experience per kill'}
                    value={expPerKill}
                    onValueChange={setExpPerKill}
                    minValue={0}
                    maxValue={100}
                    adornment={'EXP'}
                />
                <CustomNumericTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    label={'Experience per player on win'}
                    value={expPerPlayerForWin}
                    onValueChange={setExpPerPlayerForWin}
                    minValue={0}
                    maxValue={100}
                    adornment={'EXP'}
                />
            </Box>
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
