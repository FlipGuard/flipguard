import { Box, BoxProps, Link, Typography } from '@mui/material';
import React from 'react';

import { DiscordIcon } from '../../../atoms/data-display/icons/DiscordIcon';

export const SignInButton = (props: BoxProps) => {
    return (
        <Box {...props}>
            <Link
                href={`${import.meta.env.VITE_API_PROXY}/auth/login`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    borderRadius: '6px',
                    padding: '6px 16px',
                    background: '#5771c9',
                    textDecoration: 'none',
                    '&:hover': {
                        background: '#5771c9ee',
                        textDecoration: 'none',
                    },
                }}
            >
                <DiscordIcon sx={{ color: '#fff', marginRight: '10px' }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#fff' }}>SIGN IN</Typography>
            </Link>
        </Box>
    );
};
