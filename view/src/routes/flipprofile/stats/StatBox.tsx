import { Box, BoxProps, styled, SvgIconProps, Typography } from '@mui/material';
import { ComponentType } from 'react';

import { useAuth } from '../../../hooks/use-auth';

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.dark,
    padding: '8px 12px',
    borderRadius: '8px',
    margin: '8px',
}));

type Props = BoxProps & {
    userId: string;
    title: string;
    value: string | number;
    icon: ComponentType<SvgIconProps>;
    soon?: boolean;
};

export const StatBox = ({ userId, title, value, icon, soon, ...props }: Props) => {
    const { authenticated } = useAuth();

    const Icon = icon;

    return (
        <Container {...props}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    sx={(theme) => ({
                        fontWeight: 400,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        color: theme.palette.secondary.dark,
                    })}
                >
                    {title}
                </Typography>
                <Typography sx={{ fontWeight: 500, color: soon ? '#999' : '#fff' }}>
                    {soon ? '-' : authenticated || userId ? value : '-'}
                </Typography>
            </Box>
            <Box>
                <Icon sx={{ fontSize: '30px', marginLeft: '24px', marginBottom: '-4px' }} />
            </Box>
        </Container>
    );
};
