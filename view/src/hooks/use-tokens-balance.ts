import { ethers } from 'ethers';
import { useBalance } from 'wagmi';
import { polygon } from 'wagmi/chains';

export const useTokensBalance = (address: string) => {
    const isAddressValid = ethers.utils.isAddress(address);

    const { data: maticBalanceRaw, refetch: refetchMaticBalance } = useBalance({
        address: address as `0x${string}`,
        chainId: polygon.id,
        enabled: isAddressValid,
    });

    const { data: wethBalanceRaw, refetch: refetchWethBalance } = useBalance({
        address: address as `0x${string}`,
        chainId: polygon.id,
        token: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        enabled: isAddressValid,
    });

    const { data: usdcBalanceRaw, refetch: refetchUsdcBalance } = useBalance({
        address: address as `0x${string}`,
        chainId: polygon.id,
        token: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        enabled: isAddressValid,
    });

    const refetchBalance = async () => {
        await Promise.all([refetchMaticBalance(), refetchWethBalance(), refetchUsdcBalance()]);
    };

    const maticBalance = isAddressValid && maticBalanceRaw ? Number(maticBalanceRaw.formatted) : 0;
    const wethBalance = isAddressValid && wethBalanceRaw ? Number(wethBalanceRaw.formatted) : 0;
    const usdcBalance = isAddressValid && usdcBalanceRaw ? Number(usdcBalanceRaw.formatted) : 0;

    return {
        maticBalance,
        wethBalance,
        usdcBalance,
        refetchBalance,
    };
};
