import { NftEventType } from '@flipguard/domain';
import { TrackerBotWizardConfigModel } from '@flipguard/webapp-api';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Redirect } from 'wouter';

import { BotQueryKeys, getBots } from '../../api/requests/tracking-bots';
import { TrackerEditForm } from '../../components/organisms/trackers/edit/TrackerEditForm';
import { RoutePath } from '../../config/constants/navigation';
import { isSaleTracker } from '../../utils/tracking-bots';

type Props = {
    botId: string;
};

export const SaleTrackersEditRoute = ({ botId }: Props) => {
    const { isLoading, data: bots } = useQuery(BotQueryKeys.list(), getBots);

    if (isLoading || bots === undefined) {
        return null;
    }

    const bot = bots.find((b) => b.id === botId);
    if (!bot || !isSaleTracker(bot)) {
        return <Redirect to={RoutePath.Dashboard} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <TrackerEditForm
                botId={botId}
                name={bot.name}
                wizardBotConfig={bot.wizardConfig as TrackerBotWizardConfigModel}
                eventType={NftEventType.Sale}
                returnPath={RoutePath.SaleTrackers}
            />
        </Grid>
    );
};
