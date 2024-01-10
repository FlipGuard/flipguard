import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../components/molecules/table/CustomTable';

export const SweepContestsTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>Name</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>Starts</CustomTableCell>
            <CustomTableCell>Ends</CustomTableCell>
            <CustomTableCell align={'center'}>Actions</CustomTableCell>
        </TableRow>
    );
};
