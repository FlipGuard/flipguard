import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Redirect } from 'wouter';

import { getMessageTemplate, MessageTemplateQueryKeys } from '../../api/requests/message-templates';
import { RoutePath } from '../../config/constants/navigation';
import { MessageTemplatesEdit } from './MessageTemplatesEdit';

type Props = {
    templateId: string;
};

export const MessageTemplatesEditRoute = ({ templateId }: Props) => {
    const { isLoading, data: template } = useQuery(MessageTemplateQueryKeys.detail(templateId), () =>
        getMessageTemplate(templateId),
    );

    if (isLoading) {
        return null;
    }

    if (!template) {
        return <Redirect to={RoutePath.MessageTemplates} />;
    }

    return (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <MessageTemplatesEdit template={template} />
        </Grid>
    );
};
