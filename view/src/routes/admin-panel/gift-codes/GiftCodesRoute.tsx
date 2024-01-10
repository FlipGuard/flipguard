import { Permission } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import React from 'react';

import { useAuth } from '../../../hooks/use-auth';
import { GenerateGiftCodeCard } from './GenerateGiftCodeCard';

export const AdminPanelGiftCodesRoute = () => {
    const { authenticated } = useAuth();
    const { user } = useAuth();

    if (!authenticated || !user.hasPermission(Permission.ADMIN)) {
        return null;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <GenerateGiftCodeCard />
        </Grid>
    );
};
