import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../components/molecules/table/CustomTable';

export const BiddingBotsTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>Name</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>Uptime</CustomTableCell>
            <CustomTableCell>Updated</CustomTableCell>
            <CustomTableCell align={'center'}>Actions</CustomTableCell>
        </TableRow>
    );
};
