import { Grid } from '@mui/material';
import React from 'react';

import { DiscordRarityBotRouteHeader } from './DiscordRarityBotRouteHeader';
import { RarityBotDescriptionCard } from './RarityBotDescriptionCard';
import { RarityEmbeds } from './RarityEmbeds';

export const DiscordRarityBotRoute = () => {
    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <DiscordRarityBotRouteHeader />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                <RarityEmbeds />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                <RarityBotDescriptionCard />
            </Grid>
        </>
    );
};
