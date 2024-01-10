import { FlipBotGlobalGuildConfigGetDto, SUPPORTED_FLIPBOT_TOKENS } from '@flipguard/webapp-api';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Box, Card, Chip, Grid, styled, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'wouter';

import { CoinFlipQueryKeys, getFlippingRoom } from '../../../api/requests/coinflip';
import { DiscordServerIcon } from '../../../components/atoms/data-display/DiscordServerIcon';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { RoutePath } from '../../../config/constants/navigation';
import { FlippingEventInfoDialog } from './components/EventInfoDialog';

const Container = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    minHeight: '182px',
});

type Props = {
    community: FlipBotGlobalGuildConfigGetDto;
};

export const RoomOverviewCard = ({ community }: Props) => {
    const [, setLocation] = useLocation();

    const [eventInfoDialogOpen, setEventInfoDialogOpen] = useState(false);

    const { data: flippingRoom } = useQuery(CoinFlipQueryKeys.room(community.guildId), () =>
        getFlippingRoom(community.guildId),
    );

    if (!flippingRoom) {
        return null;
    }

    const contest =
        flippingRoom?.contest && flippingRoom.contest.active && flippingRoom.contest.endTime > Date.now()
            ? flippingRoom.contest
            : undefined;

    const flippingAmounts = flippingRoom?.flippingAmounts ?? {};
    const availableTokens = SUPPORTED_FLIPBOT_TOKENS.filter((tk) => !!flippingAmounts[tk]);

    return (
        <Grid key={community.guildId} item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Container>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ marginRight: '8px' }}>
                        <DiscordServerIcon
                            guildId={community.guildId}
                            icon={community.icon}
                            sx={{ width: 64, height: 64 }}
                        />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '22px',
                                fontWeight: 400,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                            }}
                        >
                            {community.name}
                        </Typography>
                        <Box sx={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <PrimaryButton
                                onClick={() => setLocation(RoutePath.Explore + '/' + community.guildId)}
                                icon={MonetizationOnOutlinedIcon}
                            >
                                Join
                            </PrimaryButton>
                            <TertiaryButton
                                disabled={!contest}
                                tooltipMessage={!contest ? 'No community event is active at the moment' : ''}
                                icon={EmojiEventsOutlinedIcon}
                                onClick={() => setEventInfoDialogOpen(true)}
                            >
                                Event
                            </TertiaryButton>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {availableTokens.map((token) => (
                        <Chip key={token} label={token} />
                    ))}
                    {availableTokens.length === 0 && (
                        <Typography sx={{ color: '#999' }}>No tokens to flip yet.</Typography>
                    )}
                </Box>
                {contest && (
                    <FlippingEventInfoDialog
                        contest={contest}
                        isOpen={eventInfoDialogOpen}
                        onClose={() => setEventInfoDialogOpen(false)}
                    />
                )}
            </Container>
        </Grid>
    );
};
