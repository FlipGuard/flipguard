import { TableRow } from '@mui/material';

import { CustomTableCell } from '../../../components/molecules/table/CustomTable';

export const ExtensionsTableHeader = () => (
    <TableRow>
        <CustomTableCell sx={{ paddingLeft: '16px' }}>Name</CustomTableCell>
        <CustomTableCell>Triggers</CustomTableCell>
        <CustomTableCell>Times used</CustomTableCell>
        <CustomTableCell>Updated</CustomTableCell>
        <CustomTableCell align={'center'}>Actions</CustomTableCell>
    </TableRow>
);
