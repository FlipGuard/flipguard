import EthIconUrl from '../../assets/eth-icon.png';
import GoneIconUrl from '../../assets/gone-icon.png';
import MaticIconUrl from '../../assets/polygon-icon.png';
import UsdcIconUrl from '../../assets/usdc-icon.png';

export type TokenInfo = {
    symbol: string;
    decimals: number;
    contract?: string;
};

export const TokenIcons: Record<string, string> = {
    MATIC: MaticIconUrl,
    USDC: UsdcIconUrl,
    WETH: EthIconUrl,
    ETH: EthIconUrl,
    GONE: GoneIconUrl,
};
