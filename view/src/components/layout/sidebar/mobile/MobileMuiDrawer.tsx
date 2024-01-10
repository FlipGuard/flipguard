import { DrawerProps, styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import React from 'react';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        height: '100%',
        width: 'fit-content',
        overflowY: 'hidden',
        backgroundColor: theme.palette.primary.dark,
        backgroundImage: 'none',
        flexDirection: 'row',
    },
}));

type Props = DrawerProps & {
    open: boolean;
    onClose: () => void;
};

export const MobileMuiDrawer = ({ open, onClose, ...drawerProps }: Props) => {
    return <Drawer anchor={'left'} open={open} onClose={onClose} {...drawerProps} />;
};
