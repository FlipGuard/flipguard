import { StartCollectionIndexingDto } from '@flipguard/webapp-api';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useIndexCollectionMutation } from '../../../api/mutations/collections';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { WalletAddressTextField } from '../../../components/atoms/inputs/text-field/WalletAddressTextField';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { displaySuccessToast } from '../../../utils/toasts';

export const IndexCollectionCard = () => {
    const isMobile = isViewMobile();

    const [address, setAddress] = useState('');

    const indexCollectionMutation = useIndexCollectionMutation();

    const onIndex = () => {
        const dto: StartCollectionIndexingDto = {
            address: address,
        };

        indexCollectionMutation.mutate(dto, {
            onSuccess: () => {
                displaySuccessToast('Indexing has been started');
            },
        });

        setAddress('');
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
                Index Collection
            </Typography>
            <WalletAddressTextField
                sx={{ margin: '8px', flexGrow: 1 }}
                name={'Address'}
                label={'Address'}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PrimaryButton
                    sx={{ margin: '16px 8px 8px 8px' }}
                    disabled={address === ''}
                    disableOnNoAuth={true}
                    loading={indexCollectionMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveOutlinedIcon}
                    onClick={onIndex}
                >
                    Index
                </PrimaryButton>
            </Box>
        </Card>
    );
};
