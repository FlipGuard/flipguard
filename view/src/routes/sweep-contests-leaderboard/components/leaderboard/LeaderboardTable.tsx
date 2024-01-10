import { MarketplaceChains, VALID_MARKETPLACE_NAMES } from '@flipguard/domain';
import { SweepContestLeaderboardDto, SweepContestType, WinnerGroup } from '@flipguard/webapp-api';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { SupportedMarketplaces } from '../../../../components/molecules/marketplaces/SupportedMarketplaces';
import { MAIN_CONTENT_BOX_ID } from '../../../../config/constants/ids';
import { useTokenPrice } from '../../../../hooks/use-token-price';
import {
    formatScore,
    getSalesCount,
    getUsdVolumes,
    getWinChances,
    isWalletBanned,
    isWalletSuspicious,
    moveWinnersToStart,
} from '../../../../utils/sweep-contests';
import { WalletSearchField } from '../WalletSearchField';
import { LeaderboardTableFilterRow } from './FiltersRow';
import { ParticipantsTableHeader } from './table/Header';
import { ParticipantsTableRow } from './table/Row';
import {
    ParticipantsTableRowContext,
    ParticipantsTableRowData,
    ParticipantsTableVirtualTableComponents,
} from './table/Virtuoso';

const getHeaderContentFn = (isAdminView: boolean, type: SweepContestType) => {
    return function headerContent() {
        return <ParticipantsTableHeader isAdminView={isAdminView} type={type} />;
    };
};

function rowContent(idx: number, row: ParticipantsTableRowData, ctx: ParticipantsTableRowContext) {
    return <ParticipantsTableRow row={row} ctx={ctx} />;
}

type Props = {
    isAdminView: boolean;
    sweepContest: SweepContestLeaderboardDto;
    winnerGroup: WinnerGroup;
};

export const SweepContestLeaderboardTable = ({ isAdminView, winnerGroup, sweepContest: sc }: Props) => {
    const theme = useTheme();
    const maticPrice = useTokenPrice(MarketplaceChains.POLYGON, '0x0000000000000000000000000000000000001010');

    const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);
    const [filter, setFilter] = useState('');

    const winChances = getWinChances(sc, winnerGroup);
    const salesCount = getSalesCount(sc);
    const usdVolumes = getUsdVolumes(sc);

    const shouldParticipantBeShown = ({ participant: p }: ParticipantsTableRowData) => {
        if (showSuspiciousOnly && (!isWalletSuspicious(p, sc) || isWalletBanned(p.address, sc))) {
            return false;
        }
        return p.address.includes(filter.toLowerCase());
    };

    const winners = sc.leaderboard.winners.find((w) => w.winnerGroupId === winnerGroup.name);
    const participants = [...sc.leaderboard.participants]
        .sort((a, b) => b.score - a.score || usdVolumes[b.address] - usdVolumes[a.address])
        .map((p, idx) => ({
            num: idx + 1,
            walletAddress: p.address,
            score: formatScore(p.score, sc.type, maticPrice),
            winChance: winChances[p.address] > 0 ? winChances[p.address].toFixed(2) + '%' : '-',
            winner: !!winners?.pickedWinners.includes(p.address),
            participant: p,
            purchases: salesCount[p.address],
            volume: formatScore(usdVolumes[p.address], SweepContestType.VOLUME, maticPrice),
        }))
        .filter(shouldParticipantBeShown);

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
                    <LeaderboardTableFilterRow
                        showSuspiciousOnly={showSuspiciousOnly}
                        setShowSuspiciousOnly={setShowSuspiciousOnly}
                    />
                )}
            </Box>
            <Box sx={{ marginBottom: '8px', borderRadius: '8px' }}>
                <WalletSearchField
                    placeholder={'Search wallet'}
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
                data={moveWinnersToStart(winners, participants)}
                components={ParticipantsTableVirtualTableComponents}
                context={{ isAdminView, sweepContest: sc }}
                fixedHeaderContent={getHeaderContentFn(isAdminView, sc.type)}
                itemContent={rowContent}
                useWindowScroll={true}
                customScrollParent={document.getElementById(MAIN_CONTENT_BOX_ID) ?? undefined}
                increaseViewportBy={256}
            />
        </Box>
    );
};
