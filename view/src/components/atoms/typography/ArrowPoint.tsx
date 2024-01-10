import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Typography } from '@mui/material';

export const ArrowPoint = ({ text }: { text: string }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '4px 8px' }}>
            <ArrowForwardOutlinedIcon
                sx={{ fontSize: '18px', color: '#bbb', marginLeft: '-2px', marginRight: '4px' }}
            />
            <Typography sx={{ fontSize: '16px', color: '#bbb' }}>{text}</Typography>
        </Box>
    );
};
