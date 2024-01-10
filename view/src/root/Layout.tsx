import { Box, CssBaseline } from '@mui/material';
import React, { useState } from 'react';

import { logout } from '../api/requests/auth';
import { Sidebar } from '../components/layout/sidebar/Sidebar';
import { PageProgress } from '../components/layout/utils/PageProgress';
import { useAuth } from '../hooks/use-auth';
import { saveRefCodeCookie } from '../utils/refcodes';
import { MemoizedMainContent } from './MainContent';

const searchParams = new URLSearchParams(location.search);
const refCode = searchParams.get('ref');
refCode && saveRefCodeCookie(refCode);

export const Layout = () => {
    const { isSigningIn } = useAuth({ forceLogin: true });

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    if (isSigningIn) {
        return (
            <Box sx={(theme) => ({ height: '100vh', margin: '-8px', backgroundColor: theme.palette.primary.dark })}>
                <PageProgress />
            </Box>
        );
    }

    return (
        <>
            <CssBaseline enableColorScheme />
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    backgroundColor: theme.palette.primary.main,
                })}
            >
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <MemoizedMainContent logOut={logout} toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
                </Box>
            </Box>
        </>
    );
};
