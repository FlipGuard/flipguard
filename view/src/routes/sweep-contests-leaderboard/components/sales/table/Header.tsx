import { Box, styled, TableCell, TableRow } from '@mui/material';

const HeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#ddd',
    padding: '10px 16px',
    borderBottom: 'none',
}));

type Props = {
    isAdminView: boolean;
};

export const SalesTableHeader = ({ isAdminView }: Props) => {
    return (
        <TableRow>
            <HeaderCell variant={'head'} sx={{ minWidth: '256px' }}>
                Item
            </HeaderCell>
            <HeaderCell variant={'head'} sx={{ minWidth: '130px' }}>
                Price
            </HeaderCell>
            <HeaderCell variant={'head'} sx={{ minWidth: '120px' }}>
                Seller
            </HeaderCell>
            <HeaderCell variant={'head'} sx={{ minWidth: '120px' }}>
                Buyer
            </HeaderCell>
            <HeaderCell variant={'head'} sx={{ minWidth: '140px' }}>
                Transaction
            </HeaderCell>
            {isAdminView && (
                <HeaderCell variant={'head'} align={'center'} sx={{ width: '1px' }}>
                    <Box sx={{ height: '20px', borderLeft: '1px solid #282828' }} />
                </HeaderCell>
            )}
            {isAdminView && (
                <HeaderCell variant={'head'} align={'center'} sx={{ minWidth: '100px' }}>
                    Actions
                </HeaderCell>
            )}
        </TableRow>
    );
};
