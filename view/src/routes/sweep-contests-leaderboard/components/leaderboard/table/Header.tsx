import { SweepContestType } from '@flipguard/webapp-api';
import { Box, styled, TableCell, TableRow, Typography } from '@mui/material';

import isViewMobile from '../../../../../hooks/utils/isViewMobile';

const HeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#ddd',
    padding: '10px 16px',
    borderBottom: 'none',
}));

type Props = {
    isAdminView: boolean;
    type: SweepContestType;
};

export const ParticipantsTableHeader = ({ isAdminView, type }: Props) => {
    const isMobile = isViewMobile(1100);

    return (
        <TableRow>
            <HeaderCell variant={'head'} sx={{ width: isMobile ? '12%' : '10%', paddingLeft: '16px' }}>
                #
            </HeaderCell>
            <HeaderCell variant={'head'} sx={{ width: isMobile ? '7%' : '3%' }} />
            <HeaderCell variant={'head'} sx={{ width: isMobile ? '25%' : '30%' }}>
                {isMobile ? 'Wallet' : 'Wallet address'}
            </HeaderCell>
            <HeaderCell variant={'head'} align={'right'} sx={{ width: isMobile ? '30%' : '18%' }}>
                {type === SweepContestType.QUANTITY ? 'Entries' : isMobile ? 'Vol' : 'Volume'}
            </HeaderCell>
            {isAdminView && (
                <HeaderCell variant={'head'} align={'right'} sx={{ width: isMobile ? '30%' : '18%' }}>
                    {type === SweepContestType.QUANTITY ? (isMobile ? 'Vol' : 'Volume') : isMobile ? 'N' : 'Purchases'}
                </HeaderCell>
            )}
            <HeaderCell variant={'head'} align={'right'} sx={{ width: isMobile ? '24%' : '20%' }}>
                <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit', textWrap: 'nowrap' }}>
                    {isMobile ? 'Win %' : 'Win chance'}
                </Typography>
            </HeaderCell>
            {isAdminView && (
                <HeaderCell variant={'head'} align={'center'} sx={{ width: '1px' }}>
                    <Box sx={{ height: '20px', borderLeft: '1px solid #282828' }} />
                </HeaderCell>
            )}
            {isAdminView && (
                <HeaderCell variant={'head'} align={'center'} sx={{ width: '7%' }}>
                    Actions
                </HeaderCell>
            )}
        </TableRow>
    );
};
