import { SweepContestLeaderboardDto, SweepContestSale } from '@flipguard/webapp-api';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { forwardRef } from 'react';
import { TableComponents } from 'react-virtuoso';

export type SalesTableRowData = SweepContestSale & {
    sellerShort: string;
    buyerShort: string;
    collectionName: string;
};

export type SalesTableRowContext = {
    isAdminView: boolean;
    sweepContest: SweepContestLeaderboardDto;
};

export const SalesTableVirtualTableComponents: TableComponents<SalesTableRowData, SalesTableRowContext> = {
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
