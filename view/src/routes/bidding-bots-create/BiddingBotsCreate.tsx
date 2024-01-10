import { MarketplaceChains } from '@flipguard/domain';
import { BiddingBotConstraints, BiddingBotInitializeDto } from '@flipguard/webapp-api';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBiddingBotInitializeMutation } from '../../api/mutations/bidding-bots';
import { InfoAlert } from '../../components/atoms/feedback/alert/InfoAlert';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { RoutePath } from '../../config/constants/navigation';
import { useCollectionName } from '../../hooks/use-collection-name';
import isViewMobile from '../../hooks/utils/isViewMobile';

export const BiddingBotsCreate = () => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

    const initializeMutation = useBiddingBotInitializeMutation();

    const [collectionAddress, setCollectionAddress] = useState('');
    const collectionName = useCollectionName(collectionAddress);

    const creationDisabled = !ethers.utils.isAddress(collectionAddress);

    const onCreate = () => {
        const dto: BiddingBotInitializeDto = {
            chain: MarketplaceChains.POLYGON,
            collection: collectionAddress,
            name: collectionName ?? collectionAddress,
        };

        initializeMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(RoutePath.BiddingBots);
            },
        });
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <GavelOutlinedIcon />
                <HeaderText>Create Bidding Bot</HeaderText>
            </HeaderBox>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CustomTextField
                    name={'Contract address'}
                    label={'Contract address'}
                    placeholder={'0x09421f533497331e1075fdca2a16e9ce3f52312b'}
                    sx={{
                        margin: '8px',
                    }}
                    value={collectionAddress}
                    onChange={(e) => setCollectionAddress(e.target.value)}
                    inputProps={{ maxLength: BiddingBotConstraints.collection.max }}
                    helperText={`Collection name: ${collectionName ?? '?'}`}
                    required
                />
                <InfoAlert sx={{ margin: '0 8px', marginBottom: '8px' }}>
                    Enter your collection contract address above and verify if displayed collection name is valid
                </InfoAlert>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.BiddingBots)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={creationDisabled}
                    disableOnNoAuth={true}
                    loading={initializeMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onCreate}
                    tooltipMessage={creationDisabled ? 'Enter valid collection address first' : undefined}
                >
                    Create Bot
                </PrimaryButton>
            </Box>
        </Card>
    );
};
