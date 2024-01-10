import { FlipProfileGetDto, isValidBadge, PublicFlipProfileGetDto } from '@flipguard/webapp-api';
import { Box, Card, Typography } from '@mui/material';

import { useAuth } from '../../../hooks/use-auth';
import { FlipProfileBadge } from './Badge';

type Props = {
    userId: string;
    flipProfile: FlipProfileGetDto | PublicFlipProfileGetDto;
};

export const FlipProfileBadgesCard = ({ userId, flipProfile }: Props) => {
    const { authenticated } = useAuth();

    return (
        <Card
            sx={{
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                height: 'fit-content',
                minHeight: '113px',
            }}
        >
            <Typography sx={{ margin: '0 0 8px 8px' }} variant={'h6'}>
                Badges
            </Typography>
            {authenticated || userId ? (
                <Box sx={{ padding: '0 4px', display: 'flex', flexWrap: 'wrap' }}>
                    {flipProfile.badges.filter(isValidBadge).map((type, idx) => (
                        <FlipProfileBadge key={idx} type={type} />
                    ))}
                </Box>
            ) : (
                <Typography sx={{ margin: '0 0 8px 8px', color: '#999' }}>SIGN IN TO VIEW YOUR BADGES</Typography>
            )}
        </Card>
    );
};
