import { FlipBotModuleFlippingSettings, FlipBotModuleFlippingSettingsUpdateDto } from '@flipguard/webapp-api';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useFlippingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../components/atoms/feedback/alert/InfoAlert';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomSwitch } from '../../../../../components/atoms/inputs/switch/CustomSwitch';
import { CustomNumericTextField } from '../../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';

const DEFAULT_BALANCE = 100;

const DYNAMIC_ODDS_DESCRIPTION = `
    The odds will adjust dynamically to keep the house balance close to the chosen amount, up to a maximum of 51:49 or 49:51.
    Works only for the MATIC flips. 
`;

type Props = {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const FlipBotFlippingModuleOddsCard = ({ configId, config }: Props) => {
    const updateMutation = useFlippingModuleSettingsUpdateMutation();

    const [useDynamicOdds, setUseDynamicOdds] = useState(config.houseWalletTargetBalance !== undefined);
    const [targetBalance, setTargetBalance] = useState<number>(config.houseWalletTargetBalance ?? DEFAULT_BALANCE);

    const onSave = () => {
        const dto: FlipBotModuleFlippingSettingsUpdateDto = {
            houseWalletTargetBalance: useDynamicOdds ? targetBalance : null,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Settings has been updated');
                },
            },
        );
    };

    const isDesiredHouseBalanceInvalid = targetBalance < 50;
    const areConfigsEqual =
        useDynamicOdds === (config.houseWalletTargetBalance !== undefined) &&
        targetBalance === (config.houseWalletTargetBalance ?? DEFAULT_BALANCE);

    const saveDisabled = isDesiredHouseBalanceInvalid || areConfigsEqual;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <PercentOutlinedIcon />
                <HeaderText>Odds</HeaderText>
            </HeaderBox>
            <CustomSwitch
                sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                label={'Use dynamic odds'}
                labelPlacement={'start'}
                checked={useDynamicOdds}
                onChange={setUseDynamicOdds}
            />
            <CustomNumericTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                label={'Desired house wallet balance'}
                disabled={!useDynamicOdds}
                value={useDynamicOdds ? targetBalance : ''}
                onValueChange={setTargetBalance}
                minValue={0}
                maxValue={10000}
                adornment={'MATIC'}
                error={isDesiredHouseBalanceInvalid}
                helperText={
                    isDesiredHouseBalanceInvalid ? 'Desired house balance cannot be lower then 50 MATIC' : undefined
                }
            />
            <InfoAlert sx={{ margin: '8px' }}>{DYNAMIC_ODDS_DESCRIPTION}</InfoAlert>
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
