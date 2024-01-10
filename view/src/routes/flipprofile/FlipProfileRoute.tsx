import { getDefaultPublicFlipProfileGetDto } from '@flipguard/webapp-api';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { FlipProfileQueryKeys, getFlipProfileOf } from '../../api/requests/flip-profiles';
import { useAuth } from '../../hooks/use-auth';
import { FlipProfileAchievementsCard } from './achievements/FlipProfileAchievementsCard';
import { FlipProfileAvatarCard } from './avatar/FlipProfileAvatarCard';
import { FlipProfileBadgesCard } from './badges/FlipProfileBadgesCard';
import { FlipProfileCommunityMembershipsCard } from './community-memberships/FlipProfileCommunityMembershipsCard';
import { FlipProfileStatsCard } from './stats/FlipProfileStatsCard';

type Props = {
    userId?: string;
};

export const FlipProfileRoute = ({ userId: userIdFromParam }: Props) => {
    const { user: currentUser, flipProfile: currentUserFlipProfile } = useAuth();

    const { data: otherUserFlipProfile = getDefaultPublicFlipProfileGetDto() } = useQuery(
        FlipProfileQueryKeys.user(userIdFromParam ?? ''),
        () => getFlipProfileOf(userIdFromParam ?? ''),
        {
            enabled: !!userIdFromParam,
        },
    );

    const flipProfile = userIdFromParam ? otherUserFlipProfile : currentUserFlipProfile;
    const userId = userIdFromParam ? userIdFromParam : currentUser.id;

    return (
        <>
            <Grid item xs={12} md={12} lg={3} xl={3}>
                <FlipProfileAvatarCard userId={userId} flipProfile={flipProfile} />
            </Grid>
            <Grid item xs={12} md={12} lg={7} xl={7}>
                <FlipProfileStatsCard userId={userId} flipProfile={flipProfile} />
            </Grid>
            <Grid item xs={12} md={12} lg={3} xl={3}>
                <FlipProfileBadgesCard userId={userId} flipProfile={flipProfile} />
                <Box sx={{ height: '24px' }} />
                <FlipProfileCommunityMembershipsCard userId={userId} flipProfile={flipProfile} />
            </Grid>
            <Grid item xs={12} md={12} lg={7} xl={7}>
                <FlipProfileAchievementsCard userId={userId} flipProfile={flipProfile} />
            </Grid>
        </>
    );
};
