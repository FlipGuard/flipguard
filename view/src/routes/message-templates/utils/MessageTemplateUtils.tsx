import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material';
import { ComponentType } from 'react';

export const MessageTemplateHeaderText = styled(Typography)({
    fontSize: '20px',
    marginLeft: '8px',
}) as ComponentType<TypographyProps>;

export const MessageTemplateHeaderBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    margin: '8px',
    marginTop: '16px',
    '& svg': {
        fontSize: '26px',
    },
}) as ComponentType<BoxProps>;
