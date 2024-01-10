import { integrationConstraints, IntegrationCreateDto, IntegrationType, WalletChain } from '@flipguard/webapp-api';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Grid, styled, Typography } from '@mui/material';
import { Wallet } from 'ethers';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useIntegrationAddMutation } from '../../api/mutations/integrations';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { PolygonWalletBalanceBox } from '../../components/organisms/wallets/PolygonWalletBalanceBox';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { useValidateIntegration } from '../../hooks/validation/integration';

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

export const BurnersCreateRoute = () => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const addMutation = useIntegrationAddMutation();

    const [showSecret, setShowSecret] = useState(false);
    const [name, setName] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const onAdd = () => {
        const dto: IntegrationCreateDto = {
            id: name,
            type: IntegrationType.BURNER_WALLET,
            value: {
                chain: WalletChain.Polygon,
                privateKey: privateKey,
            },
            description: '',
        } as IntegrationCreateDto;

        addMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(RoutePath.Burners);
            },
        });
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
    const idError = useValidateIntegration(name);

    const saveDisabled = name === '' || idError !== '' || publicAddress === '';

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
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
                        <HeaderText>Create burner</HeaderText>
                    </HeaderBox>
                    <CustomTextField
                        sx={{ margin: '8px', flexGrow: 1 }}
                        name={'Burner name'}
                        label={'Burner name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{ maxLength: integrationConstraints.id.max }}
                        error={idError !== ''}
                        helperText={idError}
                        required
                    />
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
                        disabled={saveDisabled}
                        disableOnNoAuth={true}
                        loading={addMutation.isLoading}
                        loadingPosition={'start'}
                        icon={SaveIcon}
                        onClick={() => onAdd()}
                    >
                        Save
                    </PrimaryButton>
                </Box>
            </Card>
        </Grid>
    );
};
