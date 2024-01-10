import { ThemeProvider, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';

import { queryClient } from '../config/react-query';
import { darkTheme } from '../config/themes/dark-theme';
import { wagmiConfig, WALLET_CONNECT_CHAINS, WALLET_CONNECT_PROJECT_ID } from '../config/wagmi';
import { FlipBotContextProvider } from '../contexts/flipbot-context';
import { TeamContextProvider } from '../contexts/team-context';
import { Layout } from './Layout';

createWeb3Modal({
    wagmiConfig: wagmiConfig,
    projectId: WALLET_CONNECT_PROJECT_ID,
    chains: WALLET_CONNECT_CHAINS,
    defaultChain: polygon,
});

function App() {
    const theme = darkTheme;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <WagmiConfig config={wagmiConfig}>
                    <TeamContextProvider>
                        <FlipBotContextProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Layout />
                            </LocalizationProvider>
                        </FlipBotContextProvider>
                    </TeamContextProvider>
                </WagmiConfig>
                <Toaster
                    position={isMobile ? 'bottom-center' : 'bottom-right'}
                    containerStyle={{
                        marginRight: isMobile ? '0' : '14px',
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
