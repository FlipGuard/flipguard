import { FlipBotGlobalFlippingConfig, FlipBotGlobalFlippingConfigUpdateDto } from '@flipguard/webapp-api';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Card, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState } from 'react';

import { useGlobalFlippingSettingsUpdateMutation } from '../../../../api/mutations/flipbot-global-config';
import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomNumericTextField } from '../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { WalletAddressTextField } from '../../../../components/atoms/inputs/text-field/WalletAddressTextField';
import { displaySuccessToast } from '../../../../utils/toasts';

type Props = {
    settings: FlipBotGlobalFlippingConfig;
};

export const AdminPanelFlippingSettingsCard = ({ settings }: Props) => {
    const updateMutation = useGlobalFlippingSettingsUpdateMutation();

    const [expPerSuccessfulFlip, setExpPerSuccessfulFlip] = useState(settings.expPerSuccessfulFlip);
    const [expPerFailedFlip, setExpPerFailedFlip] = useState(settings.expPerFailedFlip);
    const [feesWalletAddress, setFeesWalletAddress] = useState(settings.feesWalletAddress);
    const [feeCap, setFeeCap] = useState(settings.feeCap);
    const [feePercentage, setFeePercentage] = useState(settings.feePercentage);
    const [oddsMaxDifference, setOddsMaxDifference] = useState(settings.oddsMaxDifference);
    const [balanceChangePercentageForOddsChange, setBalanceChangePercentageForOddsChange] = useState(
        settings.balanceChangePercentageForOddsChange,
    );

    const isAddressInvalid = !!feesWalletAddress && !ethers.utils.isAddress(feesWalletAddress);
    const areConfigsEqual =
        expPerSuccessfulFlip === settings.expPerSuccessfulFlip &&
        expPerFailedFlip === settings.expPerFailedFlip &&
        feesWalletAddress === settings.feesWalletAddress &&
        feeCap === settings.feeCap &&
        feePercentage === settings.feePercentage &&
        oddsMaxDifference === settings.oddsMaxDifference &&
        balanceChangePercentageForOddsChange === settings.balanceChangePercentageForOddsChange;

    const saveDisabled = isAddressInvalid || areConfigsEqual;

    const onSave = () => {
        const dto: FlipBotGlobalFlippingConfigUpdateDto = {
            expPerSuccessfulFlip: expPerSuccessfulFlip,
            expPerFailedFlip: expPerFailedFlip,
            feesWalletAddress: feesWalletAddress,
            feeCap: feeCap,
            feePercentage: feePercentage,
            oddsMaxDifference: oddsMaxDifference,
            balanceChangePercentageForOddsChange: balanceChangePercentageForOddsChange,
        };

        updateMutation.mutate(dto, {
            onSuccess: () => {
                displaySuccessToast('CoinFlip settings has been updated');
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
                    label={'Experience from successful flip'}
                    value={expPerSuccessfulFlip}
                    onValueChange={setExpPerSuccessfulFlip}
                    minValue={0}
                    maxValue={100}
                    adornment={'EXP'}
                />
                <CustomNumericTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    label={'Experience from failed flip'}
                    value={expPerFailedFlip}
                    onValueChange={setExpPerFailedFlip}
                    minValue={0}
                    maxValue={100}
                    adornment={'EXP'}
                />
            </Box>
            <Typography sx={{ margin: '8px' }} variant={'h6'}>
                Fees
            </Typography>
            <WalletAddressTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                label={'Fees recipient'}
                value={feesWalletAddress}
                onChange={(e) => setFeesWalletAddress(e.target.value)}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <CustomNumericTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    label={'Global fee'}
                    value={feePercentage}
                    onValueChange={setFeePercentage}
                    minValue={0}
                    maxValue={100}
                    adornment={'% of the house fee'}
                />
                <CustomNumericTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    label={'Global fee cap'}
                    value={feeCap}
                    onValueChange={setFeeCap}
                    minValue={0}
                    maxValue={100}
                    adornment={'% of the flip amount'}
                />
            </Box>
            <Typography sx={{ margin: '8px' }} variant={'h6'}>
                Odds
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <CustomNumericTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    label={'Maximum deviation from the 50/50 win chance'}
                    value={oddsMaxDifference}
                    onValueChange={setOddsMaxDifference}
                    minValue={0}
                    maxValue={100}
                    adornment={'%'}
                />
                <CustomNumericTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    label={'Balance difference required for a 1% win chance deviation'}
                    value={balanceChangePercentageForOddsChange}
                    onValueChange={setBalanceChangePercentageForOddsChange}
                    minValue={0}
                    maxValue={100}
                    adornment={'%'}
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
