import { FlipBotGlobalGuildConfigGetDto, FlippingRoomDto } from '@flipguard/webapp-api';
import { useState } from 'react';

import { CustomTabsCard } from '../../../components/molecules/tabs/CustomTabsCard';
import { EventsCard } from './EventsCard';
import { LeaderboardsCard } from './LeaderboardsCard';
import { RoomFlippingCard } from './RoomFlippingCard';

const FlippingInfoTabs = {
    ROOM: 'ROOM',
    LEADERBOARDS: 'LEADERBOARDS',
    EVENTS: 'EVENTS',
} as const;

type FlippingInfoTabs = (typeof FlippingInfoTabs)[keyof typeof FlippingInfoTabs];

type Props = {
    flippingRoom: FlippingRoomDto;
    verifiedCommunities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const FlippingInfoColumn = ({ flippingRoom, verifiedCommunities }: Props) => {
    const [activeTab, setActiveTab] = useState<FlippingInfoTabs>(FlippingInfoTabs.ROOM);

    const chosenTab = (() => {
        if (activeTab === FlippingInfoTabs.ROOM) {
            return <RoomFlippingCard flippingRoom={flippingRoom} verifiedCommunities={verifiedCommunities} />;
        } else if (activeTab === FlippingInfoTabs.LEADERBOARDS) {
            return <LeaderboardsCard flippingRoom={flippingRoom} verifiedCommunities={verifiedCommunities} />;
        } else if (activeTab === FlippingInfoTabs.EVENTS) {
            return <EventsCard flippingRoom={flippingRoom} />;
        } else {
            return null;
        }
    })();

    return (
        <>
            <CustomTabsCard
                sx={{ marginBottom: '8px', maxWidth: '100%', '& button': { width: '33%' } }}
                tabs={{
                    [FlippingInfoTabs.ROOM]: { name: 'Room' },
                    [FlippingInfoTabs.LEADERBOARDS]: { name: 'Leaderboards' },
                    [FlippingInfoTabs.EVENTS]: { name: 'Events' },
                }}
                activeTab={activeTab}
                onTabChange={setActiveTab as (str: string) => void}
            />
            {chosenTab}
        </>
    );
};
