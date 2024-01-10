import { sleep } from '@flipguard/commons';
import { FlipBotModuleRumbleSettings, FlipBotModuleRumbleSettingsUpdateDto } from '@flipguard/webapp-api';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Card, Typography } from '@mui/material';
import { ethers, Wallet } from 'ethers';
import React, { useState } from 'react';

import { useRumbleModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../components/atoms/feedback/alert/InfoAlert';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomCheckbox } from '../../../../../components/atoms/inputs/checkbox/CustomCheckbox';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import { PrivateKeyTextField } from '../../../../../components/atoms/inputs/text-field/PrivateKeyTextField';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { getPublicAddressFromPkey } from '../../../../../utils/wallets';

const WALLET_DESCRIPTION = `
    Rewards wallet private key will be used to distribute BattleGround rewards to winners automatically.
    Do not input the private key of any of your main wallets. 
    This should be a fresh hot wallet that is not used anywhere else.
`;

const GENERATE_BUTTON_DESCRIPTION = `
    Click to generate a fresh wallet
`;

type Props = {
    configId: string;
    config: FlipBotModuleRumbleSettings;
};

export const RumbleWalletsTab = ({ configId, config }: Props) => {
    const updateMutation = useRumbleModuleSettingsUpdateMutation();

    const isFirstVisit = !config.rewardsWallet;

    const [pkeyGenerating, setPkeyGenerating] = useState(false);
    const [showPkeyInput, setShowPkeyInput] = useState(!isFirstVisit);
    const [rewardsWalletPkey, setRewardsWalletPkey] = useState(config.rewardsWallet?.pkey ?? '');

    const rewardsWalletPublicAddress = getPublicAddressFromPkey(rewardsWalletPkey);

    const onGenerate = async () => {
        setPkeyGenerating(true);
        await sleep(500);
        const pkey = Wallet.createRandom().privateKey.substring(2);
        setRewardsWalletPkey(pkey);
        setPkeyGenerating(false);
    };

    const onSave = () => {
        const dto: FlipBotModuleRumbleSettingsUpdateDto = {
            rewardsWalletPkey: rewardsWalletPkey || null,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    setShowPkeyInput(true);
                    displaySuccessToast('Settings has been updated');
                },
            },
        );
    };

    const areConfigsEqual = () => {
        return rewardsWalletPkey === (config.rewardsWallet?.pkey ?? '');
    };

    const isRewardsWalletPublicAddressValid = !rewardsWalletPkey || ethers.utils.isAddress(rewardsWalletPublicAddress);
    const saveDisabled = pkeyGenerating || !isRewardsWalletPublicAddressValid || areConfigsEqual();

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
                        name={'Rewards wallet address'}
                        label={'Rewards wallet address'}
                        value={isRewardsWalletPublicAddressValid ? rewardsWalletPublicAddress : ''}
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
                        setRewardsWalletPkey('');
                    }}
                    withNoBorder={true}
                />
            )}
            {showPkeyInput && (
                <PrivateKeyTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    name={'Rewards wallet private key'}
                    label={'Rewards wallet private key'}
                    value={rewardsWalletPkey}
                    onChange={(e) => setRewardsWalletPkey(e.target.value)}
                    showPublicKey={!isFirstVisit}
                />
            )}
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
