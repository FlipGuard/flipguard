import { FlipBotGlobalGuildConfigGetDto, FlippingRoomDto } from '@flipguard/webapp-api';
import { useEffect, useState } from 'react';

import {
    CoinFlipFeedsQueryKeys,
    openRecentGlobalFlipsStream,
    openRecentGuildFlipsStream,
    openRecentUserFlipsStream,
} from '../../../api/requests/coinflip-feeds';
import { CustomTabsCard } from '../../../components/molecules/tabs/CustomTabsCard';
import { useAuth } from '../../../hooks/use-auth';
import { useIdentityQuery } from '../../../hooks/use-identity-query';
import { FlipFeedTable } from './flipfeed/FlipFeedTable';

const FlipFeedTabs = {
    MY_FLIPS: 'MY_FLIPS',
    ROOM_FLIPS: 'ROOM_FLIPS',
    ALL_FLIPS: 'ALL_FLIPS',
} as const;

type FlipFeedTabs = (typeof FlipFeedTabs)[keyof typeof FlipFeedTabs];

type Props = {
    flippingRoom: FlippingRoomDto;
    verifiedCommunities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const FlippingFeedColumn = ({ flippingRoom: { roomId }, verifiedCommunities }: Props) => {
    const { user, authenticated } = useAuth();

    const [activeTab, setActiveTab] = useState<FlipFeedTabs>(
        authenticated ? FlipFeedTabs.MY_FLIPS : FlipFeedTabs.ALL_FLIPS,
    );

    const { data: myFlips = [] } = useIdentityQuery(CoinFlipFeedsQueryKeys.user(), [], {
        enabled: activeTab === FlipFeedTabs.MY_FLIPS,
    });

    const { data: roomFlips = [] } = useIdentityQuery(CoinFlipFeedsQueryKeys.guild(roomId), [], {
        enabled: activeTab === FlipFeedTabs.ROOM_FLIPS,
    });

    const { data: allFlips = [] } = useIdentityQuery(CoinFlipFeedsQueryKeys.global(), [], {
        enabled: activeTab === FlipFeedTabs.ALL_FLIPS,
    });

    useEffect(() => {
        if (activeTab === FlipFeedTabs.MY_FLIPS && authenticated) {
            const { close } = openRecentUserFlipsStream(user.id);
            return () => close();
        } else if (activeTab === FlipFeedTabs.ROOM_FLIPS) {
            const { close } = openRecentGuildFlipsStream(user.id, roomId);
            return () => close();
        } else if (activeTab === FlipFeedTabs.ALL_FLIPS) {
            const { close } = openRecentGlobalFlipsStream(user.id);
            return () => close();
        }
    }, [activeTab]);

    const flips = (() => {
        if (activeTab === FlipFeedTabs.MY_FLIPS) {
            return myFlips;
        } else if (activeTab === FlipFeedTabs.ROOM_FLIPS) {
            return roomFlips;
        } else if (activeTab === FlipFeedTabs.ALL_FLIPS) {
            return allFlips;
        } else {
            return [];
        }
    })();

    return (
        <>
            <CustomTabsCard
                sx={{ marginBottom: '8px', maxWidth: '100%', '& button': { width: '33%' } }}
                tabs={{
                    [FlipFeedTabs.MY_FLIPS]: { name: 'My Flips' },
                    [FlipFeedTabs.ROOM_FLIPS]: { name: 'Room Flips' },
                    [FlipFeedTabs.ALL_FLIPS]: { name: 'All Flips' },
                }}
                activeTab={activeTab}
                onTabChange={setActiveTab as (str: string) => void}
            />
            <FlipFeedTable flips={flips} verifiedCommunities={verifiedCommunities} />
        </>
    );
};
