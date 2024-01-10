import React from 'react';

import { SidebarLinks } from '../SidebarLinks';
import { MobileMuiDrawer } from './MobileMuiDrawer';

type Props = {
    open: boolean;
    onClose: () => void;
};

export const MobileSidebar = ({ open, onClose }: Props) => {
    return (
        <MobileMuiDrawer open={open} onClose={onClose}>
            <SidebarLinks onClose={onClose} />
        </MobileMuiDrawer>
    );
};
