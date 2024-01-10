import { TableRow } from '@mui/material';

import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';

export const OrdersTableHeader = () => {
    return (
        <TableRow>
            <CustomTableCell sx={{ paddingLeft: '16px' }} align={'center'}>
                ID
            </CustomTableCell>
            <CustomTableCell align={'center'}>Item</CustomTableCell>
            <CustomTableCell align={'center'}>Price</CustomTableCell>
            <CustomTableCell align={'center'}>Transaction</CustomTableCell>
            <CustomTableCell align={'center'}>Status</CustomTableCell>
            <CustomTableCell align={'center'}>Updated</CustomTableCell>
            <CustomTableCell align={'center'}>Actions</CustomTableCell>
        </TableRow>
    );
};
