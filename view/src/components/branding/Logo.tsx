import { Box, BoxProps, styled } from '@mui/material';

import LogoImage from '../../assets/flipguard-logo.svg';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
});

export const Logo = (props: BoxProps) => {
    return (
        <Container {...props}>
            <img src={LogoImage} alt={'Logo'} width={48} height={48} />
        </Container>
    );
};
