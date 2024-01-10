import { FlipBotTokens } from '@flipguard/webapp-api';
import { useBalance } from 'wagmi';
import { polygon } from 'wagmi/chains';

export const useBalances = (tokens: string[], address: string) => {
    const data = tokens.map((tk) => {
        const token = FlipBotTokens[tk];

        const query = useBalance({
            address: address as `0x${string}`,
            chainId: polygon.id,
            enabled: !!address,
            token: token.contract ? (token.contract as `0x${string}`) : undefined,
            formatUnits: token.decimals,
        });

        return { balance: query.data, refetch: query.refetch };
    });

    const refetchBalances = () => {
        data.forEach(({ refetch }) => refetch());
    };

    return {
        balances: Object.fromEntries(tokens.map((tk, idx) => [tk, Number(data[idx].balance?.formatted ?? 0)])),
        refetchBalances: refetchBalances,
    };
};
