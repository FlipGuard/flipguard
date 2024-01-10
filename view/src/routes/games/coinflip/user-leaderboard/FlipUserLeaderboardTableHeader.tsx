import {
    FlippingContestWinnerPickingStrategy,
    FlippingGlobalLeaderboardType,
    FlippingGuildLeaderboardType,
} from '@flipguard/webapp-api';
import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';

type Props = {
    leaderboardType: FlippingGuildLeaderboardType | FlippingGlobalLeaderboardType;
    winnerPickingStrategy?: FlippingContestWinnerPickingStrategy;
};

export const FlipUserLeaderboardTableHeader = ({ leaderboardType, winnerPickingStrategy }: Props) => {
    const scoreName = (() => {
        switch (leaderboardType) {
            case FlippingGuildLeaderboardType.TOTAL_FLIPS:
                return 'Flips';
            case FlippingGuildLeaderboardType.VOLUME:
                return 'Volume';
            case FlippingGuildLeaderboardType.PROFIT:
                return 'Profit';
            case FlippingGuildLeaderboardType.LOSS:
                return 'Loss';
            case FlippingGlobalLeaderboardType.USER_VOLUME:
                return 'Volume';
            case FlippingGlobalLeaderboardType.SERVER_VOLUME:
                return 'Volume';
            case FlippingGlobalLeaderboardType.SERVER_TOTAL_FLIPS:
                return 'Flips';
        }
    })();

    return (
        <TableRow>
            <CustomTableCell
                sx={(theme) => ({ background: theme.palette.primary.main, width: '10%', paddingLeft: '12px' })}
            >
                #
            </CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main, width: '40%' })}>
                User
            </CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main, width: '30%' })}>
                {scoreName}
            </CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main, width: '20%' })}>
                {winnerPickingStrategy === FlippingContestWinnerPickingStrategy.RANDOM ? 'Win %' : 'Flips'}
            </CustomTableCell>
        </TableRow>
    );
};
