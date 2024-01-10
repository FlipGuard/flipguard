import { Permission } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'wouter';

import { BIDDING_BOTS_QUERY_KEY, getAllBiddingBots } from '../../api/requests/bidding-bots';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { BiddingBotsEdit } from './BiddingBotsEdit';

type Props = {
    botId: string;
};

export const BiddingBotsEditRoute = ({ botId }: Props) => {
    const { user } = useAuth();

    const { isLoading, data: bots } = useQuery([BIDDING_BOTS_QUERY_KEY], getAllBiddingBots);

    if (!user.hasOneOfPermissions(Permission.ADMIN, Permission.BIDDING)) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    if (isLoading || bots === undefined) {
        return null;
    }

    const bot = bots.find((b) => b.id === botId);
    if (!bot) {
        return <Redirect to={RoutePath.BiddingBots} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <BiddingBotsEdit bot={bot} />
        </Grid>
    );
};
