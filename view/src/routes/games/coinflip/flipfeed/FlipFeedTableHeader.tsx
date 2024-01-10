import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';

export const FlipFeedTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main, paddingLeft: '12px' })}>
                Win
            </CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main })}>User</CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main })}>Bet amount</CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main })}>Room</CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main })}>Time</CustomTableCell>
        </TableRow>
    );
};
