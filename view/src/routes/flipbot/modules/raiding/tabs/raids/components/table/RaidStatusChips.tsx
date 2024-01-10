import CircleIcon from '@mui/icons-material/Circle';
import { Box, Chip, ChipProps } from '@mui/material';

export const RaidStatusOngoingChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircleIcon sx={{ fontSize: '10px', marginRight: '6px' }} />
                    ONGOING
                </Box>
            }
            sx={{
                color: '#e4b04d',
                background: '#e4b04d55',
                ...sxProps,
            }}
            {...rest}
        />
    );
};

export const RaidStatusEndedChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircleIcon sx={{ fontSize: '10px', marginRight: '6px' }} />
                    ENDED
                </Box>
            }
            sx={{
                color: '#cacaca',
                background: '#cacaca54',
                ...sxProps,
            }}
            {...rest}
        />
    );
};
