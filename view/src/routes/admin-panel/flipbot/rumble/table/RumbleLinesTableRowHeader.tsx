import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../../../components/molecules/table/CustomTable';

export const RumbleLinesTableRowHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>#</CustomTableCell>
            <CustomTableCell align={'left'}>Line</CustomTableCell>
            <CustomTableCell align={'center'}>Actions</CustomTableCell>
        </TableRow>
    );
};
