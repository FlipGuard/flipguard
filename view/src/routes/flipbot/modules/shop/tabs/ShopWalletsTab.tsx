import { FlipBotModuleShopSettings, FlipBotModuleShopSettingsUpdateDto } from '@flipguard/webapp-api';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useShopModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../components/atoms/feedback/alert/InfoAlert';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { WalletAddressTextField } from '../../../../../components/atoms/inputs/text-field/WalletAddressTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';

const WALLET_DESCRIPTION = `
    The payment recipient wallet is where users will be sending funds to when purchasing items from the shop.
`;

type Props = {
    configId: string;
    config: FlipBotModuleShopSettings;
};

export const ShopWalletsTab = ({ configId, config }: Props) => {
    const updateMutation = useShopModuleSettingsUpdateMutation();

    const [recipientAddress, setRecipientAddress] = useState(config.paymentsRecipientWalletAddress);

    const onSave = () => {
        const dto: FlipBotModuleShopSettingsUpdateDto = {
            paymentsRecipientWalletAddress: recipientAddress || null,
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

    const saveDisabled = recipientAddress === config.paymentsRecipientWalletAddress;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <AccountBalanceWalletOutlinedIcon />
                <HeaderText>{'Wallets'}</HeaderText>
            </HeaderBox>
            <WalletAddressTextField
                sx={{ margin: '8px', marginTop: '16px', flexGrow: 1 }}
                name={'Payment recipient wallet address'}
                label={'Payment recipient wallet address'}
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                required
            />
            <InfoAlert sx={{ margin: '8px' }}>{WALLET_DESCRIPTION}</InfoAlert>
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
