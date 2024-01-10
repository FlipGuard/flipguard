import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../components/molecules/table/CustomTable';

export const MessageTemplatesTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>Name</CustomTableCell>
            <CustomTableCell>Type</CustomTableCell>
            <CustomTableCell>Event</CustomTableCell>
            <CustomTableCell>Times used</CustomTableCell>
            <CustomTableCell>Updated</CustomTableCell>
            <CustomTableCell align={'center'}>Actions</CustomTableCell>
        </TableRow>
    );
};
