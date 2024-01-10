import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material';
import { ComponentType } from 'react';
import { Link, LinkProps } from 'wouter';

export const IntegrationHeaderText = styled(Typography)({
    fontSize: '20px',
    marginLeft: '8px',
}) as ComponentType<TypographyProps>;

export const IntegrationHeaderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    margin: '8px',
    marginTop: '16px',
    '& svg': {
        fontSize: '26px',
    },
}) as ComponentType<BoxProps>;

export const IntegrationBotLink = styled(Link)({
    marginLeft: '8px',
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}) as ComponentType<LinkProps>;
