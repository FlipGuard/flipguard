import {
    FlipProfileAchievementStatus,
    FlipProfileAchievementType,
    FlipProfileGetDto,
    getAchievementMeta,
    getAchievementSortOrder,
    PublicFlipProfileGetDto,
} from '@flipguard/webapp-api';
import { Card, Grid, Typography } from '@mui/material';

import { useAuth } from '../../../hooks/use-auth';
import { AchievementBox } from './AchievementBox';

const sortByAchievementOrder = (
    a: [string, FlipProfileAchievementStatus],
    b: [string, FlipProfileAchievementStatus],
) => {
    return getAchievementSortOrder(a[0]) - getAchievementSortOrder(b[0]);
};

const sortByProgress = (a: [string, FlipProfileAchievementStatus], b: [string, FlipProfileAchievementStatus]) => {
    const progressA = a[1].progress ?? 0;
    const requiredA = getAchievementMeta(a[0] as FlipProfileAchievementType).requiredProgress ?? 1;
    const progressB = b[1].progress ?? 0;
    const requiredB = getAchievementMeta(b[0] as FlipProfileAchievementType).requiredProgress ?? 1;
    return progressB / requiredB - progressA / requiredA;
};

type Props = {
    userId: string;
    flipProfile: FlipProfileGetDto | PublicFlipProfileGetDto;
};

export const FlipProfileAchievementsCard = ({ userId, flipProfile }: Props) => {
    const { authenticated } = useAuth();

    const unlockedAchievements = Object.entries(flipProfile.achievements)
        .filter(([, status]) => status.unlocked)
        .sort(sortByAchievementOrder);

    const inProgressAchievements = Object.entries(flipProfile.achievements)
        .filter(([, status]) => !status.unlocked)
        .sort(sortByProgress);

    const achievements = [...unlockedAchievements, ...inProgressAchievements];

    return (
        <Card
            sx={{
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                minHeight: '113px',
            }}
        >
            <Typography sx={{ margin: '0 0 8px 8px' }} variant={'h6'}>
                Achievements
            </Typography>
            <Grid container spacing={1}>
                {achievements.map(([type, status]) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={type}>
                        <AchievementBox type={type as FlipProfileAchievementType} status={status} />
                    </Grid>
                ))}
            </Grid>
            {!authenticated && !userId && (
                <Typography sx={{ margin: '8px', color: '#999' }}>SIGN IN TO VIEW YOUR ACHIEVEMENTS</Typography>
            )}
        </Card>
    );
};
