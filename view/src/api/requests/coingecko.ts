import { MarketplaceChain } from '@flipguard/domain';
import axios from 'axios';

const COINGECKO_CHAIN_IDS: Record<MarketplaceChain, string> = {
    Polygon: 'polygon-pos',
};

export const getCoingeckoTokenUsdPrice = async (chain: MarketplaceChain, address: string) => {
    const chainId = COINGECKO_CHAIN_IDS[chain];
    const url = `https://api.coingecko.com/api/v3/coins/${chainId}/contract/${address}`;
    const response = await axios.get(url);
    const data = response.data;
    return data['market_data']['current_price']['usd'] as number;
};
