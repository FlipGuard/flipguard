import { Box, BoxProps, styled, SvgIconProps, Typography } from '@mui/material';
import React, { ComponentType } from 'react';

const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
});

type Props = BoxProps & {
    text: string;
    icon: ComponentType<SvgIconProps>;
};

export const DashboardHeader = ({ text, icon, ...boxProps }: Props) => {
    const Icon = icon;

    return (
        <Container {...boxProps}>
            <Icon sx={{ marginRight: '8px' }} />
            <Typography sx={{ fontSize: '20px' }}>{text}</Typography>
        </Container>
    );
};
