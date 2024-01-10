import { RoleFee } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';

import { RemovableElement } from '../../../../../components/atoms/inputs/utils/RemovableElement';

type Props = {
    roleFee: RoleFee;
    onDelete: () => void;
};

export const RoleFeeCard = ({ roleFee, onDelete }: Props) => {
    return (
        <RemovableElement sx={{ width: 'fit-content' }} iconProps={{ sx: { top: 0, right: 0 } }} onDelete={onDelete}>
            <Box sx={{ margin: '8px 8px 0 8px', border: '1px solid #333', borderRadius: '6px', padding: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Role ID: </Typography>
                    <Typography>{roleFee.roleId}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Fee: </Typography>
                    <Typography>{`${roleFee.fee}%`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#aaa', marginRight: '8px' }}>Note: </Typography>
                    <Typography>{roleFee.description}</Typography>
                </Box>
            </Box>
        </RemovableElement>
    );
};
