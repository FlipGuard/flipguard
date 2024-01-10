import {
    FlippingGuildLeaderboardNames,
    FlippingGuildLeaderboardType,
    FlippingRoomDto,
    getEmptyFlippingGuildLeaderboard,
    Permission,
} from '@flipguard/webapp-api';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Card, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { CoinFlipQueryKeys, getGlobalEventInfo } from '../../../api/requests/coinflip';
import {
    CoinFlipLeaderboardsQueryKeys,
    getCommunityEventLeaderboard,
    getGlobalEventLeaderboard,
} from '../../../api/requests/coinflip-leaderboards';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { CustomSelect } from '../../../components/atoms/inputs/select/CustomSelect';
import { CustomTabsCard } from '../../../components/molecules/tabs/CustomTabsCard';
import { useAuth } from '../../../hooks/use-auth';
import { FlippingEventInfoDialog } from './components/EventInfoDialog';
import { PickWinnersDialog } from './components/PickWinnersDialog';
import { FlipUserLeaderboardTable } from './user-leaderboard/FlipUserLeaderboardTable';

const ADMIN_BUTTONS_OFFSET = '42.5px';
const LEADERBOARD_REFRESH_INTERVAL = 30_000;

const FlippingEventTypeTabs = {
    COMMUNITY: 'COMMUNITY',
    GLOBAL: 'GLOBAL',
} as const;

type FlippingEventTypeTabs = (typeof FlippingEventTypeTabs)[keyof typeof FlippingEventTypeTabs];

const Container = styled(Box)({
    marginTop: '8px',
});

type Props = {
    flippingRoom: FlippingRoomDto;
};

export const EventsCard = ({ flippingRoom }: Props) => {
    const { user } = useAuth();

    const { roomId, contest: guildContest } = flippingRoom;

    const [activeTab, setActiveTab] = useState<FlippingEventTypeTabs>(FlippingEventTypeTabs.COMMUNITY);
    const [leaderboardType, setLeaderboardType] = useState<FlippingGuildLeaderboardType | undefined>();
    const [showEventInfo, setShowEventInfo] = useState(false);
    const [winnerDialogOpened, setWinnerDialogOpened] = useState(false);

    const { data: globalContest } = useQuery(CoinFlipQueryKeys.globalEvent, getGlobalEventInfo, {
        enabled: activeTab === FlippingEventTypeTabs.GLOBAL,
    });

    const { data: guildLeaderboard = getEmptyFlippingGuildLeaderboard(roomId, guildContest?.token) } = useQuery(
        CoinFlipLeaderboardsQueryKeys.roomEvent(roomId, leaderboardType as FlippingGuildLeaderboardType),
        () => getCommunityEventLeaderboard(roomId, leaderboardType as FlippingGuildLeaderboardType),
        {
            enabled: activeTab === FlippingEventTypeTabs.COMMUNITY && !!leaderboardType,
            refetchInterval: LEADERBOARD_REFRESH_INTERVAL,
        },
    );

    const { data: globalLeaderboard = getEmptyFlippingGuildLeaderboard('', globalContest?.token) } = useQuery(
        CoinFlipLeaderboardsQueryKeys.globalEvent(leaderboardType as FlippingGuildLeaderboardType),
        () => getGlobalEventLeaderboard(leaderboardType as FlippingGuildLeaderboardType),
        {
            enabled: globalContest && activeTab === FlippingEventTypeTabs.GLOBAL && !!leaderboardType,
            refetchInterval: LEADERBOARD_REFRESH_INTERVAL,
        },
    );

    const isGlobalConfig = activeTab === FlippingEventTypeTabs.GLOBAL;
    const contest = isGlobalConfig ? globalContest : guildContest;
    const leaderboard = isGlobalConfig ? globalLeaderboard : guildLeaderboard;
    const isAdmin = (isGlobalConfig && user.hasPermission(Permission.ADMIN)) || user.id === flippingRoom.ownerId;
    const heightOffset = isAdmin ? ADMIN_BUTTONS_OFFSET : '0px';
    const availableLeaderboards = Object.keys(contest?.leaderboards ?? {}).sort();
    const eventAvailable = !!contest && availableLeaderboards.length > 0;

    useEffect(() => {
        if (contest && (!leaderboardType || contest.leaderboards[leaderboardType] === undefined)) {
            setLeaderboardType(Object.keys(contest.leaderboards)[0] as FlippingGuildLeaderboardType);
        } else {
            setLeaderboardType(undefined);
        }
    }, [contest]);

    return (
        <Container>
            <CustomTabsCard
                sx={{ marginBottom: '8px', maxWidth: '100%', '& button': { width: '50%' } }}
                tabs={{
                    [FlippingEventTypeTabs.COMMUNITY]: { name: 'Community' },
                    [FlippingEventTypeTabs.GLOBAL]: { name: 'Global' },
                }}
                activeTab={activeTab}
                onTabChange={setActiveTab as (str: string) => void}
            />
            <Box>
                <Box sx={{ display: 'flex' }}>
                    <Card
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '8px',
                            border: 'none',
                            borderRadius: '4px',
                            flexGrow: 1,
                        }}
                    >
                        <CustomSelect
                            sx={{ width: '100%' }}
                            label={availableLeaderboards.length === 0 ? 'Leaderboard' : ''}
                            options={availableLeaderboards.map((type) => ({
                                label: FlippingGuildLeaderboardNames[type as FlippingGuildLeaderboardType],
                                value: type,
                            }))}
                            value={leaderboardType ?? ''}
                            onChange={(e) => setLeaderboardType(e.target.value as FlippingGuildLeaderboardType)}
                            disabled={availableLeaderboards.length === 0}
                            select
                        />
                    </Card>
                    <TertiaryButton
                        sx={{ height: '40px', marginLeft: '8px' }}
                        onClick={() => setShowEventInfo(true)}
                        disabled={!eventAvailable}
                        icon={InfoOutlinedIcon}
                    >
                        Details
                    </TertiaryButton>
                </Box>
                <FlipUserLeaderboardTable
                    leaderboard={leaderboard}
                    winnerPickingStrategy={
                        contest?.leaderboards && leaderboardType
                            ? contest.leaderboards[leaderboardType as FlippingGuildLeaderboardType]
                            : undefined
                    }
                    winners={
                        contest?.leaderboards && leaderboardType
                            ? contest.winners[leaderboardType as FlippingGuildLeaderboardType]
                            : undefined
                    }
                    heightOffset={heightOffset}
                    fallbackText={
                        eventAvailable
                            ? 'No entries for this leaderboard yet'
                            : 'No flipping event running at the moment'
                    }
                />
                {contest && (
                    <FlippingEventInfoDialog
                        contest={contest}
                        isOpen={showEventInfo}
                        onClose={() => setShowEventInfo(false)}
                    />
                )}
            </Box>
            <Box sx={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                {isAdmin && (
                    <TertiaryButton
                        onClick={() => setWinnerDialogOpened(true)}
                        disabled={!contest || Date.now() < contest.endTime}
                        sx={{ width: '100%' }}
                    >
                        Pick winners
                    </TertiaryButton>
                )}
            </Box>
            <PickWinnersDialog
                isOpen={winnerDialogOpened}
                onClose={() => setWinnerDialogOpened(false)}
                configId={flippingRoom.configId}
                roomId={flippingRoom.roomId}
                leaderboard={leaderboard}
                contest={contest}
                global={isGlobalConfig}
            />
        </Container>
    );
};
