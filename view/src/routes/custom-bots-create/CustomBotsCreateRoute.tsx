import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { EXTENSIONS_KEY, getExtensions } from '../../api/requests/extensions';
import { CustomBotsCreate } from './CustomBotsCreate';

export const CustomBotsCreateRoute = () => {
    const { data: extensions = [] } = useQuery([EXTENSIONS_KEY], getExtensions);

    return (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <CustomBotsCreate extensions={extensions} />
        </Grid>
    );
};
