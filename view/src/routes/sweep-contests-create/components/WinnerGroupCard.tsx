import { getWinnerGroupTypeName, WinnerGroup } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';

import { RemovableElement } from '../../../components/atoms/inputs/utils/RemovableElement';
import isViewMobile from '../../../hooks/utils/isViewMobile';

type Props = {
    winnerGroup: WinnerGroup;
    onRemove: () => void;
};

export const WinnerGroupCard = ({ winnerGroup, onRemove }: Props) => {
    const isMobile = isViewMobile('sm');

    return (
        <RemovableElement onDelete={onRemove} sx={{ margin: '8px', width: isMobile ? '100%' : 'auto' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    width: isMobile ? '100%' : 'auto',
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: '#aaa' }}>Name:</Typography>
                    <Typography sx={{ marginLeft: '8px' }}>{winnerGroup.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: '#aaa' }}>Winners:</Typography>
                    <Typography sx={{ marginLeft: '8px' }}>{winnerGroup.winners}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: '#aaa' }}>Strategy:</Typography>
                    <Typography sx={{ marginLeft: '8px' }}>{getWinnerGroupTypeName(winnerGroup.type)}</Typography>
                </Box>
            </Box>
        </RemovableElement>
    );
};
