import { FlipBotGlobalGuildConfigGetDto, FlippingGlobalLeaderboard } from '@flipguard/webapp-api';
import { Box, Card, useTheme } from '@mui/material';
import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { DelayedNoDataFallback } from '../../../../components/molecules/utils/NoDataFallback';
import { FlipServerLeaderboardTableHeader } from './FlipServerLeaderboardTableHeader';
import { FlipServerLeaderboardTableRow } from './FlipServerLeaderboardTableRow';
import {
    FlipServerLeaderboardTableRowContext,
    FlipServerLeaderboardTableRowData,
    FlipServerLeaderboardVirtualTableComponents,
} from './Virtuoso';

function headerContent() {
    return <FlipServerLeaderboardTableHeader />;
}

function rowContent(idx: number, row: FlipServerLeaderboardTableRowData, ctx: FlipServerLeaderboardTableRowContext) {
    return <FlipServerLeaderboardTableRow row={row} ctx={ctx} />;
}

type Props = {
    leaderboard: FlippingGlobalLeaderboard;
    verifiedCommunities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const FlipServerLeaderboardTable = ({ leaderboard, verifiedCommunities }: Props) => {
    const theme = useTheme();

    const participants: FlipServerLeaderboardTableRowData[] = Object.keys(leaderboard.scores)
        .filter((roomId) => verifiedCommunities[roomId] !== undefined)
        .sort((a, b) => leaderboard.scores[b] - leaderboard.scores[a])
        .map((roomId, idx) => ({
            top: idx + 1,
            roomId,
            volume: leaderboard.scores[roomId],
            flips: leaderboard.flips[roomId],
            token: leaderboard.token,
        }));

    if (participants.length === 0) {
        return (
            <Card sx={{ height: 'calc(76vh - 96px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DelayedNoDataFallback text={`No leaderboard entries for ${leaderboard.token} found.`} delay={2000} />
            </Card>
        );
    }

    return (
        <Box sx={{ height: 'calc(76vh - 96px)' }}>
            <TableVirtuoso
                style={{
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.primary.main,
                    border: '1px solid #282828',
                    borderRadius: '6px',
                    boxShadow: 'none',
                }}
                data={participants}
                components={FlipServerLeaderboardVirtualTableComponents}
                context={{ communities: verifiedCommunities }}
                fixedHeaderContent={headerContent}
                itemContent={rowContent}
                increaseViewportBy={256}
            />
        </Box>
    );
};
