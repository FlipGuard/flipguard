import { MarketplaceChain } from '@flipguard/domain';

import { getCoingeckoTokenUsdPrice } from '../api/requests/coingecko';
import { useQueryOnce } from './use-query-once';

export const useTokenPrice = (chain: MarketplaceChain, address: string): number | undefined => {
    const { data: priceInUsd } = useQueryOnce(['token-price', chain, address], () =>
        getCoingeckoTokenUsdPrice(chain, address),
    );

    return priceInUsd;
};
