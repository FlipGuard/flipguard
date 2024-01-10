import { Box, BoxProps, styled } from '@mui/material';
import React from 'react';

import isViewMobile from '../../../../../hooks/utils/isViewMobile';

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active' && prop !== 'mobile',
})<BoxProps & { active: boolean; mobile: boolean }>(({ active, mobile }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    width: mobile ? '100%' : '130px',
    height: '36px',
    padding: '0 8px',
    color: '#aaa',
    '&:hover': {
        cursor: 'pointer',
        color: '#fff',
    },
    ...(active && {
        borderColor: 'red',
        color: '#fff',
        fontWeight: 400,
    }),
}));

type Props = BoxProps & {
    name: string;
    active: boolean;
};

export const ConditionTab = ({ name, active, ...boxProps }: Props) => {
    const isMobile = isViewMobile('sm');

    return (
        <Container active={active} mobile={isMobile} {...boxProps}>
            {name}
        </Container>
    );
};
