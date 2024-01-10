import { formatNumberForUi } from '@flipguard/commons';
import {
    FlippingContestWinnerPickingStrategy,
    FlippingGlobalLeaderboard,
    FlippingGlobalLeaderboardType,
    FlippingGuildLeaderboard,
    FlippingGuildLeaderboardType,
} from '@flipguard/webapp-api';
import { Box, Card, useTheme } from '@mui/material';
import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { DelayedNoDataFallback } from '../../../../components/molecules/utils/NoDataFallback';
import { useAuth } from '../../../../hooks/use-auth';
import { FlipUserLeaderboardTableHeader } from './FlipUserLeaderboardTableHeader';
import { FlipUserLeaderboardTableRow } from './FlipUserLeaderboardTableRow';
import {
    FlipUserLeaderboardTableRowContext,
    FlipUserLeaderboardTableRowData,
    FlipUserLeaderboardVirtualTableComponents,
} from './Virtuoso';

const getHeaderContentFn = (
    leaderboardType: FlippingGuildLeaderboardType | FlippingGlobalLeaderboardType,
    winnerPickingStrategy?: FlippingContestWinnerPickingStrategy,
) => {
    return function headerContent() {
        return (
            <FlipUserLeaderboardTableHeader
                leaderboardType={leaderboardType}
                winnerPickingStrategy={winnerPickingStrategy}
            />
        );
    };
};

function rowContent(idx: number, row: FlipUserLeaderboardTableRowData, ctx: FlipUserLeaderboardTableRowContext) {
    return <FlipUserLeaderboardTableRow row={row} ctx={ctx} />;
}

type Props = {
    leaderboard: FlippingGuildLeaderboard | FlippingGlobalLeaderboard;
    fallbackText?: string;
    winnerPickingStrategy?: FlippingContestWinnerPickingStrategy;
    winners?: string[];
    heightOffset?: string;
};

export const FlipUserLeaderboardTable = ({
    leaderboard,
    fallbackText,
    winnerPickingStrategy,
    winners = [],
    heightOffset,
}: Props) => {
    const theme = useTheme();
    const { user } = useAuth();

    const getSortFn = () => {
        if (leaderboard.type === FlippingGuildLeaderboardType.LOSS) {
            return (a: string, b: string) => leaderboard.scores[a] - leaderboard.scores[b];
        } else {
            return (a: string, b: string) => leaderboard.scores[b] - leaderboard.scores[a];
        }
    };

    const totalScore = Object.values(leaderboard.scores).reduce((a, b) => a + b, 0);

    const participants: FlipUserLeaderboardTableRowData[] = Object.keys(leaderboard.scores)
        .sort(getSortFn())
        .map((userId, idx) => ({
            top: idx + 1,
            userId,
            volume: leaderboard.scores[userId],
            flips: leaderboard.flips[userId],
            token: leaderboard.token,
            winChance:
                winnerPickingStrategy === FlippingContestWinnerPickingStrategy.RANDOM
                    ? formatNumberForUi((leaderboard.scores[userId] / totalScore) * 100) + '%'
                    : undefined,
            winner: winners.includes(userId),
        }));

    if (participants.length === 0) {
        return (
            <Card
                sx={{
                    height: `calc(76vh - 96px - ${heightOffset ? heightOffset : '0px'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <DelayedNoDataFallback
                    text={fallbackText ?? `No leaderboard entries for ${leaderboard.token} found.`}
                    delay={2000}
                />
            </Card>
        );
    }

    return (
        <Box sx={{ height: `calc(76vh - 96px - ${heightOffset ? heightOffset : '0px'})` }}>
            <TableVirtuoso
                style={{
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.primary.main,
                    border: '1px solid #282828',
                    borderRadius: '6px',
                    boxShadow: 'none',
                }}
                data={participants}
                components={FlipUserLeaderboardVirtualTableComponents}
                context={{ currentUserId: user.id, leaderboardType: leaderboard.type }}
                fixedHeaderContent={getHeaderContentFn(leaderboard.type, winnerPickingStrategy)}
                itemContent={rowContent}
                increaseViewportBy={256}
            />
        </Box>
    );
};
