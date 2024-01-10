import { Box, Card, CardActions, CardContent, Skeleton } from '@mui/material';
import React from 'react';

import { oneOf, random } from '../../../utils/math';

export const BurnersMasonrySkeletonCard = () => {
    return (
        <Card sx={{ padding: '4px' }}>
            <CardContent sx={{ marginBottom: '-12px' }}>
                <Skeleton sx={{ height: '24px', width: random(40, 80, '%') }} variant={'rounded'} />
            </CardContent>
            <CardContent sx={{ marginBottom: '-20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '12px' }}>
                    <Skeleton sx={{ height: '100px', width: '100%', marginBottom: '8px' }} variant={'rounded'} />
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ paddingLeft: '8px' }}>
                    <Skeleton sx={{ width: oneOf([96, 128], 'px') }} variant={'rounded'} />
                </Box>
                <Box sx={{ display: 'flex', paddingRight: '8px' }}>
                    <Skeleton sx={{ width: '28px', height: '28px', marginRight: '8px' }} variant={'circular'} />
                    <Skeleton sx={{ width: '28px', height: '28px' }} variant={'circular'} />
                </Box>
            </CardActions>
        </Card>
    );
};
