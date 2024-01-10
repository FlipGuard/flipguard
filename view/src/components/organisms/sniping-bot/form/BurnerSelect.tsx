import { BurnerWalletIntegration, IntegrationType } from '@flipguard/webapp-api';
import { Box, TextFieldProps } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Wallet } from 'ethers';
import React from 'react';

import { getIntegration, IntegrationQueryKeys } from '../../../../api/requests/integrations';
import { RoutePath } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { InfoAlert } from '../../../atoms/feedback/alert/InfoAlert';
import { WarningAlert } from '../../../atoms/feedback/alert/WarningAlert';
import { CustomSelect } from '../../../atoms/inputs/select/CustomSelect';
import { CustomLink } from '../../../atoms/navigation/CustomLink';
import { InputLikeBox } from '../../../molecules/utils/InputLikeBox';
import { PolygonWalletBalanceBox } from '../../wallets/PolygonWalletBalanceBox';

const BURNER_USAGE_TIP = `
    Remember not to use this burner anywhere else (except other sniping bots) as it may break your bot
`;

type Props = TextFieldProps & {
    burnerId: string;
    onBurnerIdChange: (id: string) => void;
};

export const BurnerSelect = ({ burnerId, onBurnerIdChange, ...props }: Props) => {
    const { user } = useAuth();

    const { data: burner } = useQuery(
        IntegrationQueryKeys.detail(burnerId),
        () => getIntegration<BurnerWalletIntegration>(burnerId),
        { enabled: burnerId !== '' },
    );

    const availableBurners = user.usedIntegrationIds(IntegrationType.BURNER_WALLET);
    const publicAddress = burner ? new Wallet(burner.value.privateKey).address : '';

    const options =
        availableBurners.length > 0
            ? availableBurners.map((i) => ({ label: i, value: i }))
            : [{ label: 'None*', value: '' }];

    if (availableBurners.length === 0) {
        return (
            <Box sx={{ margin: '8px' }}>
                <WarningAlert sx={{ marginBottom: '8px' }}>{'You have not added any burners yet'}</WarningAlert>
                <CustomLink href={RoutePath.Burners}>Click here to add a burner</CustomLink>
            </Box>
        );
    }

    return (
        <>
            <CustomSelect
                sx={{ flexGrow: 1, margin: '8px' }}
                name={'Burner ID'}
                label={'Burner'}
                value={availableBurners.includes(burnerId) ? burnerId : ''}
                onChange={(e) => onBurnerIdChange(e.target.value)}
                options={options}
                helperText={`Public address: ${publicAddress ? publicAddress : '?'}`}
                select
                required
                {...props}
            />
            <InputLikeBox label={'Balance'} sx={{ margin: '8px', padding: '6px 12px 4px 12px' }}>
                <PolygonWalletBalanceBox address={publicAddress} />
            </InputLikeBox>
            <InfoAlert sx={{ margin: '4px 8px 0 8px' }}>{BURNER_USAGE_TIP}</InfoAlert>
        </>
    );
};
