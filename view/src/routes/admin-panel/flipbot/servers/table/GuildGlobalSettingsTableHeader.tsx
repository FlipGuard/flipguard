import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../../../components/molecules/table/CustomTable';

export const GuildGlobalSettingsTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }}>Discord server</CustomTableCell>
            <CustomTableCell align={'center'}>ID</CustomTableCell>
            <CustomTableCell align={'center'}>Members</CustomTableCell>
            <CustomTableCell align={'center'}>Verified</CustomTableCell>
            <CustomTableCell align={'center'}>Actions</CustomTableCell>
        </TableRow>
    );
};
