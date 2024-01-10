import { AppBar, AppBarProps, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: '60px',
    boxShadow: 'none',
    borderTop: 'none',
    background: theme.palette.primary.dark,
    borderBottom: '1px solid #282828',
}));

export const MobileMuiAppBar = (props: AppBarProps) => {
    return <StyledAppBar position={'absolute'} {...props} />;
};
