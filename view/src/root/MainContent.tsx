import { Box, Container, Grid } from '@mui/material';
import React from 'react';

import { Topbar } from '../components/layout/topbar/Topbar';
import { MAIN_CONTENT_BOX_ID } from '../config/constants/ids';
import isViewMobile from '../hooks/utils/isViewMobile';
import { ProtectedRoutes } from '../routes/ProtectedRoutes';

type Props = {
    logOut: () => void;
    toggleSidebar: () => void;
};

const MainContent = ({ logOut, toggleSidebar }: Props) => {
    const isMobile = isViewMobile();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Topbar logOut={logOut} toggleSidebar={toggleSidebar} />
            <Box
                id={MAIN_CONTENT_BOX_ID}
                component={'main'}
                sx={(theme) => ({
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${theme.palette.primaryBorder.main} ${theme.palette.primary.dark}`,
                    '&::-webkit-scrollbar': {
                        width: '0.3em',
                        height: '0.3em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `${theme.palette.primaryBorder.main}`,
                    },
                    height: `100%`,
                    paddingBottom: isMobile ? '96px' : '48px',
                    backgroundColor: theme.palette.primary.dark,
                    borderLeft: isMobile ? 'none' : `1px solid ${theme.palette.primaryBorder.main}`,
                })}
            >
                <Container maxWidth="xl">
                    <Grid container spacing={3} justifyContent={'center'} sx={{ marginTop: isMobile ? '60px' : 0 }}>
                        <ProtectedRoutes />
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export const MemoizedMainContent = React.memo(MainContent);
