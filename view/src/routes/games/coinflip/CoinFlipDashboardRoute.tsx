import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { CoinFlipQueryKeys, getFlippingRoom } from '../../../api/requests/coinflip';
import { getVerifiedCommunities, VerifiedCommunitiesQueryKeys } from '../../../api/requests/verified-communities';
import { FlippingFeedColumn } from './FlippingFeedColumn';
import { FlippingInfoColumn } from './FlippingInfoColumn';
import { FlippingWalletColumn } from './FlippingWalletColumn';

const DEFAULT_ROOM_ID = import.meta.env.VITE_DEFAULT_COINFLIP_ROOM_ID;

type Props = {
    roomId?: string;
};

export const CoinFlipDashboardRoute = ({ roomId = DEFAULT_ROOM_ID }: Props) => {
    const { data: verifiedCommunities = {} } = useQuery(VerifiedCommunitiesQueryKeys.all, getVerifiedCommunities);
    const { data: flippingRoom } = useQuery(CoinFlipQueryKeys.room(roomId), () => getFlippingRoom(roomId));

    if (!flippingRoom) {
        return null;
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={4}>
                <FlippingInfoColumn flippingRoom={flippingRoom} verifiedCommunities={verifiedCommunities} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={4}>
                <FlippingWalletColumn flippingRoom={flippingRoom} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={4}>
                <FlippingFeedColumn flippingRoom={flippingRoom} verifiedCommunities={verifiedCommunities} />
            </Grid>
        </>
    );
};
