import { SweepContestLeaderboardDto, SweepContestParticipant } from '@flipguard/webapp-api';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { forwardRef } from 'react';
import { TableComponents } from 'react-virtuoso';

export type ParticipantsTableRowData = {
    num: number;
    score: string;
    winChance: string;
    winner: boolean;
    participant: SweepContestParticipant;
    purchases: number;
    volume: string;
};

export type ParticipantsTableRowContext = {
    isAdminView: boolean;
    sweepContest: SweepContestLeaderboardDto;
};

export const ParticipantsTableVirtualTableComponents: TableComponents<
    ParticipantsTableRowData,
    ParticipantsTableRowContext
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
