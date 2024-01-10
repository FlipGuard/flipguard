import { Box, BoxProps, styled } from '@mui/material';

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    margin: '8px',
    marginTop: '16px',
    '& svg': {
        fontSize: '26px',
    },
});

export const HeaderBox = (props: BoxProps) => {
    return <StyledBox {...props} />;
};
