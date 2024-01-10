import React from 'react';

import { SidebarLinks } from '../SidebarLinks';
import { DesktopMuiDrawer } from './DesktopMuiDrawer';

export const DesktopSidebar = () => {
    return (
        <DesktopMuiDrawer open={true}>
            <SidebarLinks onClose={() => {}} />
        </DesktopMuiDrawer>
    );
};
