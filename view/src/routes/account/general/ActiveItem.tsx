import { OrderItem, ReceivedItemModel } from '@flipguard/webapp-api';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import { Box, BoxProps, CircularProgress, styled, Typography } from '@mui/material';

import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';

const Container = styled(Box)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    margin: '8px',
});

type Props = BoxProps & {
    item: ReceivedItemModel;
};

export const ActiveItem = ({ item, ...props }: Props) => {
    const { name, shortDescription } = OrderItem.forType(item.type);

    const endDate = new Date(item.expiresAt);
    const isInfinite = item.expiresAt === Number.MAX_SAFE_INTEGER;
    const expiresOnString = isInfinite ? 'Expires never' : `Expires on ${endDate.toLocaleString()}`;

    return (
        <Container {...props}>
            <FadingTooltip title={expiresOnString} placement={'top'}>
                <Box sx={{ marginRight: '8px' }}>
                    <CircularProgressWithLabel expiresAt={item.expiresAt} />
                </Box>
            </FadingTooltip>
            <Box sx={{ marginTop: '-8px' }}>
                <Typography sx={{ fontSize: '18px' }}>{name}</Typography>
                <Typography sx={{ fontSize: '14px', marginTop: '-2px', color: '#999' }}>{shortDescription}</Typography>
            </Box>
        </Container>
    );
};

type CircularProgressWithLabelProps = {
    expiresAt: number;
};

const CircularProgressWithLabel = ({ expiresAt }: CircularProgressWithLabelProps) => {
    const expiresIn = Math.max(expiresAt - Date.now(), 0);
    const daysLeft = Math.floor(expiresIn / (24 * 3600 * 1000));
    const progress = Math.min(daysLeft, 31) / 31;

    let label;
    if (daysLeft < 1) {
        label = '<1d';
    } else if (daysLeft > 99) {
        label = '99+';
    } else {
        label = `${daysLeft}d`;
    }

    let color;
    if (daysLeft < 3) {
        color = '#ff4f4f';
    } else if (daysLeft < 7) {
        color = '#ffea22';
    } else {
        color = '#2bd373';
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                sx={{ position: 'absolute', color: '#444', top: 0, left: 0 }}
                variant={'determinate'}
                value={100}
            />
            <CircularProgress sx={{ color }} variant={'determinate'} value={progress * 100} />
            <Box
                sx={{
                    top: -6,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    '&:hover': {
                        cursor: 'default',
                    },
                }}
            >
                {expiresAt !== Number.MAX_SAFE_INTEGER ? label : <AllInclusiveOutlinedIcon sx={{ fontSize: '21px' }} />}
            </Box>
        </Box>
    );
};
