import CircleIcon from '@mui/icons-material/Circle';
import { Box, Chip, ChipProps } from '@mui/material';

export const SweepContestStatusChip = (props: { active: boolean; ended: boolean } & ChipProps) => {
    const { active, ended, ...chipProps } = props;

    if (ended) {
        return <EndedStatusChip {...chipProps} />;
    } else if (active) {
        return <ActiveStatusChip {...chipProps} />;
    } else {
        return <InactiveStatusChip {...chipProps} />;
    }
};

const ActiveStatusChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircleIcon sx={{ fontSize: '10px', marginRight: '6px' }} />
                    RUNNING
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

const EndedStatusChip = (props: ChipProps) => {
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
