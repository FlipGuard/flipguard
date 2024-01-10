import { FlipBotGlobalShopConfig, FlipBotGlobalShopConfigUpdateDto } from '@flipguard/webapp-api';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalShopSettingsUpdateMutation } from '../../../../api/mutations/flipbot-global-config';
import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomNumericTextField } from '../../../../components/atoms/inputs/text-field/CustomNumericTextField';
import { WalletAddressTextField } from '../../../../components/atoms/inputs/text-field/WalletAddressTextField';
import { displaySuccessToast } from '../../../../utils/toasts';

type Props = {
    settings: FlipBotGlobalShopConfig;
};

export const AdminPanelShopFeesCard = ({ settings }: Props) => {
    const updateMutation = useGlobalShopSettingsUpdateMutation();

    const [feesWalletAddress, setFeesWalletAddress] = useState(settings.feesWalletAddress);
    const [feePercentage, setFeePercentage] = useState(settings.feePercentage);

    const saveDisabled = feesWalletAddress === settings.feesWalletAddress && feePercentage === settings.feePercentage;

    const onSave = () => {
        const dto: FlipBotGlobalShopConfigUpdateDto = {
            feesWalletAddress: feesWalletAddress,
            feePercentage: feePercentage,
        };

        updateMutation.mutate(dto, {
            onSuccess: () => {
                displaySuccessToast('Shop settings has been updated');
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
                Fees
            </Typography>
            <WalletAddressTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                label={'Fees recipient'}
                value={feesWalletAddress}
                onChange={(e) => setFeesWalletAddress(e.target.value)}
            />
            <CustomNumericTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                label={'Fee'}
                value={feePercentage}
                onValueChange={setFeePercentage}
                minValue={0}
                maxValue={100}
                adornment={'% of the item price'}
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
