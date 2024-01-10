import { DrawerProps, styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import React from 'react';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    '& .MuiDrawer-paper': {
        zIndex: 0,
        position: 'relative',
        whiteSpace: 'nowrap',
        border: 'none',
        height: '100vh',
        width: 'fit-content',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.dark,
        boxSizing: 'border-box',
        flexDirection: 'row',
    },
}));

export const DesktopMuiDrawer = (props: DrawerProps) => {
    return <Drawer variant={'permanent'} {...props} />;
};
