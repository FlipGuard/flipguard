import CircleIcon from '@mui/icons-material/Circle';
import { Box, Chip, ChipProps } from '@mui/material';

export const BotStatusChip = (props: { active: boolean } & ChipProps) => {
    const { active, ...chipProps } = props;
    return active ? <ActiveStatusChip {...chipProps} /> : <InactiveStatusChip {...chipProps} />;
};

const ActiveStatusChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircleIcon sx={{ fontSize: '10px', marginRight: '6px' }} />
                    ACTIVE
                </Box>
            }
            sx={{
                color: '#3fba78',
                background: '#3fba7855',
                ...sxProps,
            }}
            {...rest}
        />
    );
};

const InactiveStatusChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircleIcon sx={{ fontSize: '10px', marginRight: '6px' }} />
                    STOPPED
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
