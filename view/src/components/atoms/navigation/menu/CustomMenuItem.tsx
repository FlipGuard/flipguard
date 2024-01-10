import { MenuItem, MenuItemProps } from '@mui/material';

export const CustomMenuItem = (props: MenuItemProps) => {
    return (
        <MenuItem
            sx={(theme) => ({
                '&:focus': {
                    background: 'none',
                },
                '&:hover': {
                    background: theme.palette.menuItem.main,
                },
            })}
            {...props}
            disableRipple
        >
            {props.children}
        </MenuItem>
    );
};
