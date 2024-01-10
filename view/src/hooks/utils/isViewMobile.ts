import { useMediaQuery, useTheme } from '@mui/material';

export default function isViewMobile(breakpoint: 'sm' | 'md' | number = 'md') {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(breakpoint));
}
