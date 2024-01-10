import { TableRow } from '@mui/material';

import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';

export const PayoutsTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }} align={'center'}>
                Payout ID
            </CustomTableCell>
            <CustomTableCell align={'center'}>Amount</CustomTableCell>
            <CustomTableCell align={'center'}>Transaction</CustomTableCell>
            <CustomTableCell align={'center'}>Time</CustomTableCell>
        </TableRow>
    );
};
