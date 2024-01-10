import { NftEventType } from '@flipguard/domain';
import { Box, Chip, ChipProps } from '@mui/material';

export const EventTypeChip = (props: { type: NftEventType } & ChipProps) => {
    const { type } = props;

    switch (type) {
        case NftEventType.Listing:
            return <ListingEventTypeChip {...props} />;
        case NftEventType.Sale:
            return <SaleEventTypeChip {...props} />;
        case NftEventType.AutobuySale:
            return <AutobuySaleEventTypeChip {...props} />;
        default:
            return null;
    }
};

const ListingEventTypeChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            height: '22px',
                            width: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: '#da7526',
                            marginRight: '6px',
                            marginLeft: '-8px',
                            fontSize: '16px',
                        }}
                    >
                        L
                    </Box>
                    Listing
                </Box>
            }
            sx={{
                background: '#a1602973',
                ...sxProps,
            }}
            {...rest}
        />
    );
};

const SaleEventTypeChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            height: '22px',
                            width: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: '#e14e74',
                            marginRight: '6px',
                            marginLeft: '-8px',
                            paddingRight: '1px',
                            fontSize: '16px',
                        }}
                    >
                        S
                    </Box>
                    Sale
                </Box>
            }
            sx={{
                background: '#ae4c6488',
                ...sxProps,
            }}
            {...rest}
        />
    );
};

const AutobuySaleEventTypeChip = (props: ChipProps) => {
    const { sx: sxProps, ...rest } = props;

    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            height: '22px',
                            width: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: '#e14e74',
                            marginRight: '6px',
                            marginLeft: '-8px',
                            paddingRight: '1px',
                            fontSize: '16px',
                        }}
                    >
                        S
                    </Box>
                    Snipe
                </Box>
            }
            sx={{
                background: `#ae4c6488`,
                ...sxProps,
            }}
            {...rest}
        />
    );
};
