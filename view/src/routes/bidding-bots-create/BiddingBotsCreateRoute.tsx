import { Permission } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import React from 'react';
import { Redirect } from 'wouter';

import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import { BiddingBotsCreate } from './BiddingBotsCreate';

export const BiddingBotsCreateRoute = () => {
    const { user } = useAuth();
    if (!user.hasOneOfPermissions(Permission.ADMIN, Permission.BIDDING)) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    return (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <BiddingBotsCreate />
        </Grid>
    );
};
