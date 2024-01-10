import { MarketplaceChains, VALID_MARKETPLACE_NAMES } from '@flipguard/domain';
import { SweepContestLeaderboardDto, SweepContestSale } from '@flipguard/webapp-api';
import { Box, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { SupportedMarketplaces } from '../../../../components/molecules/marketplaces/SupportedMarketplaces';
import { MAIN_CONTENT_BOX_ID } from '../../../../config/constants/ids';
import { useCollectionNames } from '../../../../hooks/use-collection-name';
import { isSaleBanned, isSaleSuspicious } from '../../../../utils/sweep-contests';
import { WalletSearchField } from '../WalletSearchField';
import { SalesTableFilterRow } from './FiltersRow';
import { SalesTableHeader } from './table/Header';
import { SalesTableRow } from './table/Row';
import { SalesTableRowContext, SalesTableRowData, SalesTableVirtualTableComponents } from './table/Virtuoso';

const getHeaderContentFn = (isAdminView: boolean) => {
    return function headerContent() {
        return <SalesTableHeader isAdminView={isAdminView} />;
    };
};

function rowContent(idx: number, sale: SalesTableRowData, ctx: SalesTableRowContext) {
    return <SalesTableRow sale={sale} ctx={ctx} />;
}

type Props = {
    isAdminView: boolean;
    sweepContest: SweepContestLeaderboardDto;
};

export const SweepContestSalesTable = ({ isAdminView, sweepContest: sc }: Props) => {
    const theme = useTheme();

    const collectionAddresses = Array.from(new Set(sc.leaderboard.sales.map((s) => s.collection.address)));
    const collectionNames = useCollectionNames(collectionAddresses);

    const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);
    const [filter, setFilter] = useState('');

    const shouldSaleBeShown = (s: SweepContestSale) => {
        if (showSuspiciousOnly && (!isSaleSuspicious(s, sc) || isSaleBanned(s, sc))) {
            return false;
        }
        return s.buyer.includes(filter.toLowerCase());
    };

    const filtered = sc.leaderboard.sales
        .filter(shouldSaleBeShown)
        .map((s) => ({
            ...s,
            sellerShort: s.seller.substring(0, 4) + '...' + s.seller.substring(s.seller.length - 4),
            buyerShort: s.buyer.substring(0, 4) + '...' + s.buyer.substring(s.buyer.length - 4),
            collectionName: collectionNames[s.collection.address] ?? '',
        }))
        .sort((a, b) => b.transaction.timestamp - a.transaction.timestamp);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                    marginBottom: '16px',
                    gap: '12px',
                }}
            >
                <SupportedMarketplaces
                    chain={MarketplaceChains.POLYGON}
                    marketplaces={(sc.marketplaceRestrictions ?? VALID_MARKETPLACE_NAMES).filter((n) => n !== 'Maxis')}
                />
                <Box sx={{ flexGrow: 1 }} />
                {isAdminView && (
                    <SalesTableFilterRow
                        showSuspiciousOnly={showSuspiciousOnly}
                        setShowSuspiciousOnly={setShowSuspiciousOnly}
                    />
                )}
            </Box>
            <Box sx={{ marginBottom: '8px', borderRadius: '8px' }}>
                <WalletSearchField
                    placeholder={'Search buyer'}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </Box>
            <TableVirtuoso
                style={{
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.primary.main,
                    border: '1px solid #282828',
                    borderRadius: '6px',
                    boxShadow: 'none',
                    overflowY: 'hidden',
                }}
                data={filtered}
                context={{ isAdminView, sweepContest: sc }}
                components={SalesTableVirtualTableComponents}
                fixedHeaderContent={getHeaderContentFn(isAdminView)}
                itemContent={rowContent}
                useWindowScroll={true}
                customScrollParent={document.getElementById(MAIN_CONTENT_BOX_ID) ?? undefined}
                defaultItemHeight={73}
                increaseViewportBy={1024}
            />
        </Box>
    );
};
