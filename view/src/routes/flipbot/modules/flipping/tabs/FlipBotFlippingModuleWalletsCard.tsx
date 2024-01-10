import { sleep } from '@flipguard/commons';
import { FlipBotModuleFlippingSettings, FlipBotModuleFlippingSettingsUpdateDto } from '@flipguard/webapp-api';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Divider, Typography } from '@mui/material';
import { ethers, Wallet } from 'ethers';
import React, { useState } from 'react';

import { useFlippingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../components/atoms/feedback/alert/InfoAlert';
import { WarningAlert } from '../../../../../components/atoms/feedback/alert/WarningAlert';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomCheckbox } from '../../../../../components/atoms/inputs/checkbox/CustomCheckbox';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import { PrivateKeyTextField } from '../../../../../components/atoms/inputs/text-field/PrivateKeyTextField';
import { WalletAddressTextField } from '../../../../../components/atoms/inputs/text-field/WalletAddressTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { getPublicAddressFromPkey } from '../../../../../utils/wallets';

const HOUSE_WALLET_DESCRIPTION = `
    House wallet private key will be used to distribute CoinFlip rewards and fees automatically.
    Do not input the private key of any of your main wallets. 
    This should be a fresh hot wallet that is not used anywhere else.
`;

const HOUSE_WALLET_WARNING = `
    Remember not to withdraw any assets from this wallet while the bot is running, otherwise it may stop working.
    If you'd like to withdraw funds from your house wallet disable the module first and wait for a few minutes so
    all ongoing flips can finish.
`;

const FEE_WALLET_DESCRIPTION = `
    The fee wallet is where all fees generated from flips on your server will be sent to as soon as a they have executed successfully.
`;

const FEE_WALLET_WARNING = `
    Fees from winning flips are kept in the house wallet, so it doesn't need to be topped up frequently.
`;

const GENERATE_BUTTON_DESCRIPTION = `
    Click to generate a fresh wallet
`;

type Props = {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const FlipBotFlippingModuleWalletsCard = ({ configId, config }: Props) => {
    const updateMutation = useFlippingModuleSettingsUpdateMutation();

    const isFirstVisit = !config.houseWallet;

    const [pkeyGenerating, setPkeyGenerating] = useState(false);
    const [showPkeyInput, setShowPkeyInput] = useState(!isFirstVisit);
    const [houseWalletPkey, setHouseWalletPkey] = useState(config.houseWallet?.pkey ?? '');
    const [feeWalletAddress, setFeeWalletAddress] = useState(config.feeWalletAddress ?? '');

    const houseWalletPublicAddress = getPublicAddressFromPkey(houseWalletPkey);

    const onGenerate = async () => {
        setPkeyGenerating(true);
        await sleep(500);
        const pkey = Wallet.createRandom().privateKey.substring(2);
        setHouseWalletPkey(pkey);
        setPkeyGenerating(false);
        onSave(pkey);
    };

    const onSave = (houseWalletPkey: string) => {
        const dto: FlipBotModuleFlippingSettingsUpdateDto = {
            houseWalletPkey: houseWalletPkey || null,
            feeWalletAddress: feeWalletAddress || null,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    setShowPkeyInput(!!dto.houseWalletPkey);
                    displaySuccessToast('Settings has been updated');
                },
            },
        );
    };

    const areConfigsEqual = () => {
        return (
            houseWalletPkey === (config.houseWallet?.pkey ?? '') && feeWalletAddress === (config.feeWalletAddress ?? '')
        );
    };

    const isHouseWalletPublicAddressValid = !houseWalletPkey || ethers.utils.isAddress(houseWalletPublicAddress);
    const isFeeWalletAddressValid = !feeWalletAddress || ethers.utils.isAddress(feeWalletAddress);
    const saveDisabled =
        pkeyGenerating || !isFeeWalletAddressValid || !isHouseWalletPublicAddressValid || areConfigsEqual();

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
            {isFirstVisit && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <TertiaryButton
                        sx={{ margin: '8px', height: '40px' }}
                        onClick={onGenerate}
                        loading={pkeyGenerating}
                        tooltipMessage={GENERATE_BUTTON_DESCRIPTION}
                        tooltipPlacement={'top'}
                        disabled={showPkeyInput}
                    >
                        Generate
                    </TertiaryButton>
                    <CustomTextField
                        sx={{ margin: '8px 8px 0 8px', flexGrow: 1 }}
                        name={'House wallet address'}
                        label={'House wallet address'}
                        value={isHouseWalletPublicAddressValid ? houseWalletPublicAddress : ''}
                        disabled={true}
                    />
                </Box>
            )}
            {isFirstVisit && (
                <CustomCheckbox
                    boxProps={{ sx: { margin: '8px', marginLeft: '-2px' } }}
                    label={'Use your own private key'}
                    checked={showPkeyInput}
                    onChange={(v) => {
                        setShowPkeyInput(v);
                        setHouseWalletPkey('');
                    }}
                    withNoBorder={true}
                />
            )}
            {showPkeyInput && (
                <PrivateKeyTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    name={'House wallet private key'}
                    label={'House wallet private key'}
                    value={houseWalletPkey}
                    onChange={(e) => setHouseWalletPkey(e.target.value)}
                    showPublicKey={!isFirstVisit}
                />
            )}
            <InfoAlert sx={{ margin: '8px' }}>{HOUSE_WALLET_DESCRIPTION}</InfoAlert>
            <WarningAlert sx={{ margin: '8px' }}>{HOUSE_WALLET_WARNING}</WarningAlert>
            <Divider sx={{ margin: '16px 8px 8px 8px', borderStyle: 'dashed' }} />
            <WalletAddressTextField
                sx={{ margin: '8px', marginTop: '16px', flexGrow: 1 }}
                name={'Fee wallet address'}
                label={'Fee wallet address'}
                value={feeWalletAddress}
                onChange={(e) => setFeeWalletAddress(e.target.value)}
                required
            />
            <InfoAlert sx={{ margin: '8px' }}>{FEE_WALLET_DESCRIPTION}</InfoAlert>
            <WarningAlert sx={{ margin: '8px' }}>{FEE_WALLET_WARNING}</WarningAlert>
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
                    onClick={() => onSave(houseWalletPkey)}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
