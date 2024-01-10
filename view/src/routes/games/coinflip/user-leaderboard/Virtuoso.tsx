import { FlippingGlobalLeaderboardType, FlippingGuildLeaderboardType } from '@flipguard/webapp-api';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { forwardRef } from 'react';
import { TableComponents } from 'react-virtuoso';

export type FlipUserLeaderboardTableRowData = {
    top: number;
    userId: string;
    volume: number;
    token: string;
    flips: number;
    winChance?: string;
    winner?: boolean;
};

export type FlipUserLeaderboardTableRowContext = {
    currentUserId: string;
    leaderboardType: FlippingGuildLeaderboardType | FlippingGlobalLeaderboardType;
};

export const FlipUserLeaderboardVirtualTableComponents: TableComponents<
    FlipUserLeaderboardTableRowData,
    FlipUserLeaderboardTableRowContext
> = {
    Scroller: forwardRef<HTMLDivElement>(function scroller(props, ref) {
        return <TableContainer component={Paper} {...props} ref={ref} />;
    }),
    Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate' }} />,
    TableHead,
    TableRow,
    TableBody: forwardRef<HTMLTableSectionElement>(function tableBody(props, ref) {
        return <TableBody {...props} ref={ref} />;
    }),
};
