import { Box, Card, CardActions, CardContent, Divider, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';

import { oneOf, random } from '../../../utils/math';

export const SnipingBotMasonrySkeletonCard = () => {
    return (
        <Card sx={{ padding: '4px' }}>
            <CardContent sx={{ marginBottom: '-12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton sx={{ height: '24px', width: random(40, 60, '%') }} variant={'rounded'} />
                    <Typography sx={{ flexGrow: 1 }} />
                    <Skeleton
                        sx={{ height: '28px', width: oneOf([75, 100], 'px'), borderRadius: '16px' }}
                        variant={'rounded'}
                    />
                    <Skeleton sx={{ width: '28px', height: '28px', marginLeft: '12px' }} variant={'rounded'} />
                </Box>
                <Box>
                    <Skeleton
                        sx={{ height: '12px', marginTop: '12px', width: random(30, 40, '%') }}
                        variant={'rounded'}
                    />
                    <Skeleton sx={{ height: '12px', margin: '4px 0', width: '80%' }} variant={'rounded'} />
                </Box>
            </CardContent>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#444', margin: '8px 16px 0 16px' }} />
            <CardContent sx={{ marginBottom: '-20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
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
                    <Skeleton sx={{ width: oneOf([128, 168], 'px') }} variant={'rounded'} />
                </Box>
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    divider={<Divider sx={{ marginRight: '8px' }} orientation="vertical" flexItem />}
                >
                    <Stack direction={'row'} justifyContent={'center'}>
                        <Box sx={{ display: 'flex', paddingRight: '8px' }}>
                            <Skeleton sx={{ width: '28px', height: '28px', marginRight: '8px' }} variant={'circular'} />
                            <Skeleton sx={{ width: '28px', height: '28px' }} variant={'circular'} />
                        </Box>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'center'}>
                        <Box sx={{ display: 'flex', paddingRight: '8px' }}>
                            <Skeleton sx={{ width: '28px', height: '28px' }} variant={'circular'} />
                        </Box>
                    </Stack>
                </Stack>
            </CardActions>
        </Card>
    );
};
