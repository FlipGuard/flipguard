import { AppBar, AppBarProps, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: '60px',
    boxShadow: 'none',
    borderTop: 'none',
    background: theme.palette.primary.dark,
    borderBottom: '1px solid #282828',
    borderLeft: '1px solid #282828',
}));

export const DesktopMuiAppBar = (props: AppBarProps) => {
    return <StyledAppBar position={'relative'} {...props} />;
};
