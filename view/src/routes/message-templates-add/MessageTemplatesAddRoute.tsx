import { Grid } from '@mui/material';
import React from 'react';

import { MessageTemplatesAdd } from './MessageTemplatesAdd';

export const MessageTemplatesAddRoute = () => {
    return (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <MessageTemplatesAdd />
        </Grid>
    );
};
