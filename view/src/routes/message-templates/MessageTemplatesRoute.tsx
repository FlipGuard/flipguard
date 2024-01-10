import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getMessageTemplates, MessageTemplateQueryKeys } from '../../api/requests/message-templates';
import { useAuth } from '../../hooks/use-auth';
import { MessageTemplatesRouteHeader } from './MessageTemplatesRouteHeader';
import { MessageTemplatesTable } from './table/MessageTemplatesTable';

export const MessageTemplatesRoute = () => {
    const { authenticated } = useAuth();

    const { isLoading, data: templates } = useQuery(MessageTemplateQueryKeys.list(), getMessageTemplates, {
        enabled: authenticated,
    });

    const showProgress = authenticated && isLoading;

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <MessageTemplatesRouteHeader />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <MessageTemplatesTable templates={templates ?? []} loading={showProgress} />
            </Grid>
        </>
    );
};
