import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Grid, InputAdornment, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { CoinFlipQueryKeys, getGlobalEventInfo } from '../../../api/requests/coinflip';
import { getVerifiedCommunities, VerifiedCommunitiesQueryKeys } from '../../../api/requests/verified-communities';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { FlippingEventInfoDialog } from './components/EventInfoDialog';
import { RoomOverviewCard } from './RoomOverviewCard';

export const CoinFlipRoomExplorerRoute = () => {
    const [searchText, setSearchText] = useState('');
    const [eventInfoDialogOpened, setEventInfoDialogOpened] = useState(false);

    const { data: globalContest } = useQuery(CoinFlipQueryKeys.globalEvent, getGlobalEventInfo);
    const { data: verifiedCommunities = {} } = useQuery(VerifiedCommunitiesQueryKeys.all, getVerifiedCommunities);

    const communitiesToShow = Object.values(verifiedCommunities)
        .filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    const contest = globalContest?.active && globalContest.endTime > Date.now() ? globalContest : undefined;

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Typography variant={'h3'}>Communities</Typography>
                <Typography sx={{ fontSize: '18px', color: '#999', marginTop: '8px' }}>
                    Explore verified community rooms.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <CustomTextField
                    sx={{ width: '100%', '& .MuiInputBase-root': { borderRadius: '6px' } }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder={'Search community'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon sx={{ color: '#666' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            {contest && (
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                    <Box
                        sx={{
                            backgroundColor: '#146d96',
                            backgroundImage: 'linear-gradient(315deg, #7acbfc 0%, #146d96 74%)',
                            minHeight: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '24px',
                            borderRadius: '6px',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => setEventInfoDialogOpened(true)}
                    >
                        <Typography variant={'h5'} sx={{ fontWeight: 400 }}>
                            A cross-server flipping event is ACTIVE! Click to see details.
                        </Typography>
                    </Box>
                    <FlippingEventInfoDialog
                        contest={contest}
                        isOpen={eventInfoDialogOpened}
                        onClose={() => setEventInfoDialogOpened(false)}
                    />
                </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Grid container spacing={3}>
                    {communitiesToShow.map((community) => (
                        <RoomOverviewCard key={community.guildId} community={community} />
                    ))}
                </Grid>
            </Grid>
        </>
    );
};
