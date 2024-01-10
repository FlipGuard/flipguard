import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Redirect } from 'wouter';

import { EXTENSIONS_KEY, getExtensions } from '../../api/requests/extensions';
import { BotQueryKeys, getBots } from '../../api/requests/tracking-bots';
import { RoutePath } from '../../config/constants/navigation';
import { isCustomBot } from '../../utils/tracking-bots';
import { CustomBotsEdit } from './CustomBotsEdit';

type Props = {
    botId: string;
};

export const CustomBotsEditRoute = ({ botId }: Props) => {
    const { isLoading, data: bots } = useQuery(BotQueryKeys.list(), getBots);
    const { data: extensions = [] } = useQuery([EXTENSIONS_KEY], getExtensions);

    if (isLoading || bots === undefined) {
        return null;
    }

    const bot = bots.find((b) => b.id === botId);
    if (!bot || !isCustomBot(bot)) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    return (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <CustomBotsEdit bot={bot} extensions={extensions} />
        </Grid>
    );
};
