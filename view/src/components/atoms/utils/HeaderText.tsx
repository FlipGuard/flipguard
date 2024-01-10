import { styled, Typography, TypographyProps } from '@mui/material';

const StyledHeaderText = styled(Typography)({
    fontSize: '20px',
    fontWeight: 400,
    marginLeft: '8px',
});

export const HeaderText = (props: TypographyProps) => {
    return <StyledHeaderText {...props} />;
};
