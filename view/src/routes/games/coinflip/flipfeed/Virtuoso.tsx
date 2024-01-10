import { FlipBotGlobalGuildConfigGetDto, FlipExecutedGetDto } from '@flipguard/webapp-api';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { forwardRef } from 'react';
import { TableComponents } from 'react-virtuoso';

export type FlipFeedTableRowData = FlipExecutedGetDto;

export type FlipFeedTableRowContext = {
    currentUserId: string;
    communities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const FlipFeedTableVirtualTableComponents: TableComponents<FlipFeedTableRowData, FlipFeedTableRowContext> = {
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
