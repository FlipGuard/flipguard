import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { RoutePath } from '../../../config/constants/navigation';

type Props = {
    returnLocation: RoutePath;
    title: string;
};

export const CardHeader = ({ returnLocation, title }: Props) => {
    const [, setLocation] = useLocation();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '8px',
                marginBottom: '16px',
            }}
        >
            <IconButton sx={{ marginLeft: '-8px' }} onClick={() => setLocation(returnLocation)}>
                <KeyboardBackspaceOutlinedIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }} />
            <Typography variant={'h6'}>{title}</Typography>
            <Typography sx={{ flexGrow: 1 }} />
            <IconButton sx={{ visibility: 'hidden', marginLeft: '-8px' }} disabled>
                <KeyboardBackspaceOutlinedIcon />
            </IconButton>
        </Box>
    );
};
