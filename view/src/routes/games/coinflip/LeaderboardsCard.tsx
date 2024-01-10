import {
    FlipBotGlobalGuildConfigGetDto,
    FlippingGlobalLeaderboardType,
    FlippingRoomDto,
    getEmptyFlippingGlobalLeaderboard,
    getEmptyFlippingGuildLeaderboard,
    SUPPORTED_FLIPBOT_TOKEN_SYMBOLS,
} from '@flipguard/webapp-api';
import { Box, Card, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
    CoinFlipLeaderboardsQueryKeys,
    getGlobalLeaderboard,
    getRoomLeaderboard,
} from '../../../api/requests/coinflip-leaderboards';
import { CustomSelect } from '../../../components/atoms/inputs/select/CustomSelect';
import { CustomTabsCard } from '../../../components/molecules/tabs/CustomTabsCard';
import { FlipServerLeaderboardTable } from './server-leaderboard/FlipServerLeaderboardTable';
import { FlipUserLeaderboardTable } from './user-leaderboard/FlipUserLeaderboardTable';

const LEADERBOARD_REFRESH_INTERVAL = 30_000;

const FlippingLeaderboardTabs = {
    COMMUNITY: 'COMMUNITY',
    CROSS_COMMUNITY: 'CROSS_COMMUNITY',
    GLOBAL: 'GLOBAL',
} as const;

type FlippingLeaderboardTabs = (typeof FlippingLeaderboardTabs)[keyof typeof FlippingLeaderboardTabs];

const Container = styled(Box)({
    marginTop: '8px',
});

type Props = {
    flippingRoom: FlippingRoomDto;
    verifiedCommunities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const LeaderboardsCard = ({ flippingRoom: { roomId }, verifiedCommunities }: Props) => {
    const [activeTab, setActiveTab] = useState<FlippingLeaderboardTabs>(FlippingLeaderboardTabs.COMMUNITY);
    const [chosenToken, setChosenToken] = useState('MATIC');

    const { data: roomLeaderboard = getEmptyFlippingGuildLeaderboard(roomId) } = useQuery(
        CoinFlipLeaderboardsQueryKeys.room(roomId, chosenToken),
        () => getRoomLeaderboard(roomId, chosenToken),
        {
            refetchInterval: LEADERBOARD_REFRESH_INTERVAL,
            enabled: activeTab === FlippingLeaderboardTabs.COMMUNITY,
        },
    );

    const { data: serversLeaderboard = getEmptyFlippingGlobalLeaderboard() } = useQuery(
        CoinFlipLeaderboardsQueryKeys.global(FlippingGlobalLeaderboardType.SERVER_VOLUME, chosenToken),
        () => getGlobalLeaderboard(FlippingGlobalLeaderboardType.SERVER_VOLUME, chosenToken),
        {
            refetchInterval: LEADERBOARD_REFRESH_INTERVAL,
            enabled: activeTab === FlippingLeaderboardTabs.GLOBAL,
        },
    );

    const { data: topUsersLeaderboard = getEmptyFlippingGlobalLeaderboard() } = useQuery(
        CoinFlipLeaderboardsQueryKeys.global(FlippingGlobalLeaderboardType.USER_VOLUME, chosenToken),
        () => getGlobalLeaderboard(FlippingGlobalLeaderboardType.USER_VOLUME, chosenToken),
        {
            refetchInterval: LEADERBOARD_REFRESH_INTERVAL,
            enabled: activeTab === FlippingLeaderboardTabs.CROSS_COMMUNITY,
        },
    );

    const leaderboard = (() => {
        switch (activeTab) {
            case FlippingLeaderboardTabs.COMMUNITY:
                return <FlipUserLeaderboardTable leaderboard={roomLeaderboard} />;
            case FlippingLeaderboardTabs.GLOBAL:
                return (
                    <FlipServerLeaderboardTable
                        leaderboard={serversLeaderboard}
                        verifiedCommunities={verifiedCommunities}
                    />
                );
            case FlippingLeaderboardTabs.CROSS_COMMUNITY:
                return <FlipUserLeaderboardTable leaderboard={topUsersLeaderboard} />;
            default:
                return null;
        }
    })();

    return (
        <Container>
            <Card
                sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', border: 'none', borderRadius: '4px' }}
            >
                <CustomSelect
                    sx={{ width: '100%' }}
                    label={''}
                    options={SUPPORTED_FLIPBOT_TOKEN_SYMBOLS.map((tk) => ({ label: tk, value: tk }))}
                    value={chosenToken}
                    onChange={(e) => setChosenToken(e.target.value)}
                    select
                />
            </Card>
            <CustomTabsCard
                sx={{ marginBottom: '8px', maxWidth: '100%', '& button': { width: '33%' } }}
                tabs={{
                    [FlippingLeaderboardTabs.COMMUNITY]: { name: 'Community' },
                    [FlippingLeaderboardTabs.CROSS_COMMUNITY]: { name: 'Global' },
                    [FlippingLeaderboardTabs.GLOBAL]: { name: 'Top servers' },
                }}
                activeTab={activeTab}
                onTabChange={setActiveTab as (str: string) => void}
            />
            {leaderboard}
        </Container>
    );
};
