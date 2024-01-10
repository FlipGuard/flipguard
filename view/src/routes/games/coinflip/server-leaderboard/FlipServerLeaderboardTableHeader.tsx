import { TableRow } from '@mui/material';
import React from 'react';

import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';

export const FlipServerLeaderboardTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell
                sx={(theme) => ({ background: theme.palette.primary.main, width: '10%', paddingLeft: '12px' })}
            >
                #
            </CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main, width: '40%' })}>
                Community
            </CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main, width: '30%' })}>
                Volume
            </CustomTableCell>
            <CustomTableCell sx={(theme) => ({ background: theme.palette.primary.main, width: '20%' })}>
                Flips
            </CustomTableCell>
        </TableRow>
    );
};
