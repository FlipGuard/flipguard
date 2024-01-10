import { formatNumberForUi } from '@flipguard/commons';
import { FlipProfileGetDto, getFlipLevelForExp, PublicFlipProfileGetDto } from '@flipguard/webapp-api';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';

import { useRequestSyncMutation } from '../../../api/mutations/sync';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { LoadingIconButton } from '../../../components/atoms/inputs/button/LoadingIconButton';
import { useAuth } from '../../../hooks/use-auth';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { StatBox } from './StatBox';

type Props = {
    userId: string;
    flipProfile: FlipProfileGetDto | PublicFlipProfileGetDto;
};

export const FlipProfileStatsCard = ({ userId, flipProfile }: Props) => {
    const isMobile = isViewMobile();
    const { authenticated, user } = useAuth();

    const { mutation: requestSyncMutation, syncing, disabled } = useRequestSyncMutation();

    const onSync = () => {
        requestSyncMutation.mutate();
    };

    const totalFlips = flipProfile.stats.flipping.totalFlips;
    const maticFlipped = flipProfile.stats.flipping.volumePerToken['MATIC'] ?? 0;
    const totalExp = Object.values(flipProfile.experience).reduce((a, b) => a + b, 0);
    const level = getFlipLevelForExp(totalExp)[0];

    const syncDisabled = !authenticated || disabled || requestSyncMutation.isLoading;

    return (
        <Card
            sx={{
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                marginTop: isMobile ? '0px' : '16px',
                height: isMobile ? 'auto' : 'calc(100% - 16px)',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ margin: '0 0 8px 8px' }} variant={'h6'}>
                    Stats
                </Typography>
                {user.id === userId && (
                    <Box>
                        <FadingTooltip title={'Synchronize profile information'} placement={'top'}>
                            <span>
                                <LoadingIconButton onClick={onSync} loading={syncing} disabled={syncDisabled}>
                                    <SyncOutlinedIcon />
                                </LoadingIconButton>
                            </span>
                        </FadingTooltip>
                    </Box>
                )}
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <StatBox userId={userId} title={'FlipGuard Level'} value={level} icon={LocalPoliceOutlinedIcon} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <StatBox userId={userId} title={'Total flips'} value={totalFlips} icon={TollOutlinedIcon} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <StatBox
                        userId={userId}
                        title={'Matic flipped'}
                        value={formatNumberForUi(maticFlipped, false)}
                        icon={MonetizationOnOutlinedIcon}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <StatBox
                        userId={userId}
                        title={'DAO memberships'}
                        value={''}
                        soon={true}
                        icon={PeopleAltOutlinedIcon}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <StatBox
                        userId={userId}
                        title={'Community NFTs held'}
                        value={''}
                        soon={true}
                        icon={Diversity3OutlinedIcon}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <StatBox
                        userId={userId}
                        title={'Quests completed'}
                        value={''}
                        soon={true}
                        icon={InventoryOutlinedIcon}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};
