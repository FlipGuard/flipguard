import { FlipBotGlobalGuildConfigGetDto } from '@flipguard/webapp-api';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { forwardRef } from 'react';
import { TableComponents } from 'react-virtuoso';

export type FlipServerLeaderboardTableRowData = {
    top: number;
    roomId: string;
    volume: number;
    token: string;
    flips: number;
};

export type FlipServerLeaderboardTableRowContext = {
    communities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const FlipServerLeaderboardVirtualTableComponents: TableComponents<
    FlipServerLeaderboardTableRowData,
    FlipServerLeaderboardTableRowContext
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
