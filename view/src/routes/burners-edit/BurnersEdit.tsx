import { BurnerWalletIntegration, IntegrationUpdateDto, WalletChain } from '@flipguard/webapp-api';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, styled, Typography } from '@mui/material';
import { Wallet } from 'ethers';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useIntegrationUpdateMutation } from '../../api/mutations/integrations';
import { useBotRestartMutation } from '../../api/mutations/tracking-bots';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { PolygonWalletBalanceBox } from '../../components/organisms/wallets/PolygonWalletBalanceBox';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { IntegrationEditDialog } from '../integrations-edit/IntegrationEditDialog';

const HeaderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    margin: '8px',
    marginTop: '16px',
    '& svg': {
        fontSize: '26px',
    },
});

const HeaderText = styled(Typography)({
    fontSize: '20px',
    marginLeft: '8px',
});

type Props = {
    burner: BurnerWalletIntegration;
};

export const BurnersEdit = ({ burner: originalBurner }: Props) => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const updateMutation = useIntegrationUpdateMutation();
    const restartBotMutation = useBotRestartMutation();

    const [showSecret, setShowSecret] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [privateKey, setPrivateKey] = useState(originalBurner.value.privateKey);

    const onUpdate = (botsToRestart: string[]) => {
        const dto: IntegrationUpdateDto = {
            value: {
                chain: WalletChain.Polygon,
                privateKey: privateKey,
            },
        };

        updateMutation.mutate(
            { integrationId: originalBurner.id, dto: dto },
            {
                onSettled: () => {
                    setDialogOpen(false);
                },
                onSuccess: () => {
                    setLocation(RoutePath.Burners);
                    botsToRestart.forEach((botId) => {
                        restartBotMutation.mutate(botId);
                    });
                },
            },
        );
    };

    const getPublicAddress = (privateKey: string) => {
        try {
            const wallet = new Wallet('0x' + privateKey);
            return wallet.address;
        } catch (err) {
            return '';
        }
    };

    const publicAddress = getPublicAddress(privateKey);
    const updateDisabled = publicAddress === '' || privateKey === originalBurner.value.privateKey;

    return (
        <Card
            sx={{
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <HeaderBox sx={{ marginTop: 0 }}>
                    <LocalFireDepartmentOutlinedIcon />
                    <HeaderText>{originalBurner.id}</HeaderText>
                </HeaderBox>
                <CustomTextField
                    sx={{ margin: '8px', flexGrow: 1 }}
                    name={'Private key'}
                    label={'Private key'}
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    inputProps={{ maxLength: 128 }}
                    showSecret={showSecret}
                    setShowSecret={setShowSecret}
                    helperText={`Public address: ${publicAddress ? publicAddress : '?'}`}
                    required
                />
                {publicAddress !== '' && (
                    <InputLikeBox label={'Balance'} sx={{ margin: '8px', padding: '6px 12px 4px 12px' }}>
                        <PolygonWalletBalanceBox address={publicAddress} />
                    </InputLikeBox>
                )}
            </Box>
            <Box sx={{ display: 'flex', margin: '8px' }}>
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.Burners)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={updateDisabled || dialogOpen || updateMutation.isLoading}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={() => setDialogOpen(true)}
                >
                    Update
                </PrimaryButton>
            </Box>
            <IntegrationEditDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                integrationId={originalBurner.id}
                onUpdate={onUpdate}
                isUpdateLoading={updateMutation.isLoading}
            />
        </Card>
    );
};
