import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../../../../../../components/molecules/table/CustomTable';

export const RaidsTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>Title</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>Ends</CustomTableCell>
            <CustomTableCell>Required</CustomTableCell>
            <CustomTableCell>Raiders</CustomTableCell>
            <CustomTableCell align={'center'}>Actions</CustomTableCell>
        </TableRow>
    );
};
