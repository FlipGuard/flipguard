import { QueryClient } from '@tanstack/react-query';
import { defaultWagmiConfig } from '@web3modal/wagmi/react';
import { FallbackTransport } from 'viem';
import { Chain, Config, PublicClient, WebSocketPublicClient } from 'wagmi';
import { polygon } from 'wagmi/chains';

export const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
export const WALLET_CONNECT_CHAINS: Chain[] = [polygon];

type WagmiConfigType = Config<PublicClient<FallbackTransport>, WebSocketPublicClient<FallbackTransport>> & {
    queryClient: QueryClient;
};

export const wagmiConfig: WagmiConfigType = defaultWagmiConfig({
    chains: WALLET_CONNECT_CHAINS,
    projectId: WALLET_CONNECT_PROJECT_ID,
});
