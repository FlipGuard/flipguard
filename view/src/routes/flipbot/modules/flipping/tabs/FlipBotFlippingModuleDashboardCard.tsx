import { FlipBotModuleFlippingSettings } from '@flipguard/webapp-api';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DataSaverOffOutlinedIcon from '@mui/icons-material/DataSaverOffOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Card, styled } from '@mui/material';
import React from 'react';

import { DashboardHeader } from '../../../../../components/atoms/utils/DashboardHeader';
import isViewMobile from '../../../../../hooks/utils/isViewMobile';
import { GuildFlippingBarCharts } from '../components/GuildFlippingBarCharts';
import { GuildFlippingHouseWalletBalance } from '../components/GuildFlippingHouseWalletBalance';
import { GuildFlippingSettingsBox } from '../components/GuildFlippingSettingsBox';
import { GuildFlippingStatsBox } from '../components/GuildFlippingStatsBox';

const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
});

type Props = {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const FlipBotFlippingModuleDashboardCard = ({ configId, config }: Props) => {
    const isMobile = isViewMobile();

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: isMobile ? '100%' : '49%' }}>
                <Box>
                    <DashboardHeader text={'House Wallet'} icon={AccountBalanceWalletOutlinedIcon} />
                    <StyledCard>
                        <GuildFlippingHouseWalletBalance config={config} />
                    </StyledCard>
                </Box>
                <Box sx={{ margin: '16px 0' }}>
                    <DashboardHeader text={'Analytics'} icon={AssessmentOutlinedIcon} />
                    <StyledCard>
                        <GuildFlippingBarCharts configId={configId} />
                    </StyledCard>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: isMobile ? '100%' : '49%',
                }}
            >
                <Box>
                    <DashboardHeader text={'Stats'} icon={DataSaverOffOutlinedIcon} />
                    <StyledCard>
                        <GuildFlippingStatsBox sx={{ margin: '8px' }} configId={configId} config={config} />
                    </StyledCard>
                </Box>
                <Box sx={{ margin: '16px 0' }}>
                    <DashboardHeader text={'Settings'} icon={SettingsOutlinedIcon} />
                    <StyledCard>
                        <GuildFlippingSettingsBox sx={{ margin: '8px' }} configId={configId} config={config} />
                    </StyledCard>
                </Box>
            </Box>
        </Box>
    );
};
