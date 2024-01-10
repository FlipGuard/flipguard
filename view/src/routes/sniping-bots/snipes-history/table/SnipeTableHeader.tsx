import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';

export const SnipeTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '12px' }}>Item</CustomTableCell>
            <CustomTableCell>Price</CustomTableCell>
            <CustomTableCell>Marketplace</CustomTableCell>
            <CustomTableCell>Transaction</CustomTableCell>
            <CustomTableCell>Time</CustomTableCell>
        </TableRow>
    );
};
