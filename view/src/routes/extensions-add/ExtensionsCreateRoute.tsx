import { Grid } from '@mui/material';
import React from 'react';

import { ExtensionsCreate } from './ExtensionsCreate';

export const ExtensionsCreateRoute = () => {
    return (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <ExtensionsCreate />
        </Grid>
    );
};
