import { FlipProfileGetDto, PublicFlipProfileGetDto } from '@flipguard/webapp-api';
import { Box, Card, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getVerifiedCommunities, VerifiedCommunitiesQueryKeys } from '../../../api/requests/verified-communities';
import { DiscordServerIcon } from '../../../components/atoms/data-display/DiscordServerIcon';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { useAuth } from '../../../hooks/use-auth';

type Props = {
    userId: string;
    flipProfile: FlipProfileGetDto | PublicFlipProfileGetDto;
};

export const FlipProfileCommunityMembershipsCard = ({ userId, flipProfile }: Props) => {
    const { authenticated } = useAuth();

    const { data: verifiedCommunities = {} } = useQuery(VerifiedCommunitiesQueryKeys.all, getVerifiedCommunities);

    const communitiesToDisplay = flipProfile.memberships.discordServers
        .filter((id) => verifiedCommunities[id] !== undefined)
        .map((id) => verifiedCommunities[id])
        .sort((a, b) => a.name.localeCompare(b.name));

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
                Communities
            </Typography>
            <Box sx={{ padding: '0 4px', display: 'flex', flexWrap: 'wrap' }}>
                {communitiesToDisplay.map(({ guildId, name, icon }) => (
                    <FadingTooltip key={guildId} title={name}>
                        <span style={{ margin: '4px' }}>
                            <DiscordServerIcon sx={{ width: '32px', height: '32px' }} guildId={guildId} icon={icon} />
                        </span>
                    </FadingTooltip>
                ))}
                {!authenticated && !userId && (
                    <Typography sx={{ padding: '0 4px', color: '#999' }}>SIGN IN TO VIEW COMMUNITIES</Typography>
                )}
            </Box>
        </Card>
    );
};
