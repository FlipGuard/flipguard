import { Box, BoxProps, styled, Typography } from '@mui/material';
import React from 'react';

import FlipGuardLogo from '../../../assets/flipguard-logo.svg';
import { useDelay } from '../../../hooks/use-delay';

const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '64px 0px',
});

type Props = BoxProps & {
    text: string;
};

export const NoDataFallback = ({ text, ...props }: Props) => {
    const lines = text.split('\n');

    return (
        <Container {...props}>
            <img src={FlipGuardLogo} alt={''} width={44} style={{ marginBottom: '8px' }} />
            {lines.map((line, idx) => (
                <Typography key={idx} textAlign={'center'}>
                    {line}
                </Typography>
            ))}
        </Container>
    );
};

type DelayedNoDataFallbackProps = Props & {
    delay: number;
};

export const DelayedNoDataFallback = ({ delay, ...props }: DelayedNoDataFallbackProps) => {
    const show = useDelay(delay);
    return show ? <NoDataFallback {...props} /> : null;
};
