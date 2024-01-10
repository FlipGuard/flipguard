import { BiddingBotGetDto } from '@flipguard/webapp-api';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Chip, ChipProps } from '@mui/material';

type Props = ChipProps & {
    bot: BiddingBotGetDto;
};

export const BiddingBotsStatusChip = ({ bot, ...chipProps }: Props) => {
    const configured = !!bot.marketplaces?.OpenSea?.slug;

    if (!configured) {
        return <NotConfiguredStatusChip {...chipProps} />;
    } else if (bot.active) {
        return <ActiveStatusChip {...chipProps} />;
    } else {
        return <StoppedStatusChip {...chipProps} />;
    }
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

const StoppedStatusChip = (props: ChipProps) => {
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

const NotConfiguredStatusChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircleIcon sx={{ fontSize: '10px', marginRight: '6px' }} />
                    NOT CONFIGURED
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
