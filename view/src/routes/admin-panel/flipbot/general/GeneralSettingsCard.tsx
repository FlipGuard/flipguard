import { FlipBotGlobalConfigGetDto, FlipBotGlobalConfigUpdateDto } from '@flipguard/webapp-api';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalGeneralSettingsUpdateMutation } from '../../../../api/mutations/flipbot-global-config';
import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomSwitch } from '../../../../components/atoms/inputs/switch/CustomSwitch';
import { CustomTextField } from '../../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../../hooks/utils/isViewMobile';

type Props = {
    settings: FlipBotGlobalConfigGetDto;
};

export const AdminPanelFlipBotGeneralSettingsCard = ({ settings }: Props) => {
    const isMobile = isViewMobile();

    const updateMutation = useGlobalGeneralSettingsUpdateMutation();

    const [stopped, setStopped] = useState(settings.stopped);
    const [rumbleStopped, setRumbleStopped] = useState(settings.rumbleStopped);
    const [blockchainFeaturesStopped, setBlockchainFeaturesStopped] = useState(settings.blockchainFeaturesStopped);
    const [stopReason, setStopReason] = useState(settings.stopReason);

    const saveDisabled =
        stopped === settings.stopped &&
        rumbleStopped === settings.rumbleStopped &&
        blockchainFeaturesStopped === settings.blockchainFeaturesStopped &&
        stopReason === settings.stopReason;

    const onSave = () => {
        const dto: FlipBotGlobalConfigUpdateDto = {
            stopped: stopped,
            rumbleStopped: rumbleStopped,
            blockchainFeaturesStopped: blockchainFeaturesStopped,
            stopReason: stopReason,
        };

        updateMutation.mutate(dto);
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '8px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Typography sx={{ margin: '8px' }} variant={'h6'}>
                Settings
            </Typography>
            <CustomSwitch
                sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                label={'Disable FlipSuite completely'}
                labelPlacement={'start'}
                checked={stopped}
                onChange={setStopped}
            />
            <CustomSwitch
                sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                label={'Disable BattleGround'}
                labelPlacement={'start'}
                checked={rumbleStopped}
                onChange={setRumbleStopped}
            />
            <CustomSwitch
                sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                label={'Disable Blockchain Features'}
                labelPlacement={'start'}
                checked={blockchainFeaturesStopped}
                onChange={setBlockchainFeaturesStopped}
            />
            <CustomTextField
                sx={{ margin: '8px', marginTop: '16px' }}
                label={'Stop reason'}
                placeholder={'Maintenance, hotfix etc.'}
                value={stopReason}
                onChange={(e) => setStopReason(e.target.value)}
                multiline
                minRows={3}
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
