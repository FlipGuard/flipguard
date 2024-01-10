import { BiddingBotGetDto } from '@flipguard/webapp-api';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { BalanceSection } from './components/BalanceSection';
import { NftsSection } from './components/NftsSection';

type Props = {
    bot: BiddingBotGetDto;
};

export const BiddingBotsWallet = ({ bot }: Props) => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 16px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <AccountBalanceWalletOutlinedIcon />
                <HeaderText>Bidding Bot Wallet</HeaderText>
            </HeaderBox>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CustomTextField
                    name={'Wallet address'}
                    label={'Address'}
                    sx={{ margin: '8px' }}
                    value={bot.walletAddress}
                    disabled={true}
                />
            </Box>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <HeaderBox>
                        <PaidOutlinedIcon />
                        <HeaderText>Balance</HeaderText>
                    </HeaderBox>
                    <BalanceSection botId={bot.id} walletAddress={bot.walletAddress} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <HeaderBox>
                        <FilterNoneOutlinedIcon />
                        <HeaderText>NFTs</HeaderText>
                    </HeaderBox>
                    <NftsSection botId={bot.id} collectionAddress={bot.collection} walletAddress={bot.walletAddress} />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', margin: '8px' }}>
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.BiddingBots)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
            </Box>
        </Card>
    );
};
