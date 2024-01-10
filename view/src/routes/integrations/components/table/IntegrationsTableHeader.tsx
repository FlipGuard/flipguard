import { TableRow } from '@mui/material';

import { CustomTableCell } from '../../../../components/molecules/table/CustomTable';

export const IntegrationsTableHeader = () => (
    <TableRow>
        <CustomTableCell sx={{ paddingLeft: '16px' }}>Name</CustomTableCell>
        <CustomTableCell>Type</CustomTableCell>
        <CustomTableCell>Times used</CustomTableCell>
        <CustomTableCell>Updated</CustomTableCell>
        <CustomTableCell align={'center'}>Actions</CustomTableCell>
    </TableRow>
);
