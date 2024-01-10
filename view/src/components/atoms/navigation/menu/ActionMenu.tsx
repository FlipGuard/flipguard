import { Divider, ListItemIcon, ListItemText, Menu, MenuProps, SvgIcon } from '@mui/material';
import React from 'react';

import { CustomMenuItem } from './CustomMenuItem';

type Action = {
    icon?: typeof SvgIcon;
    name: string;
    hide?: boolean;
    callback?: () => void;
};

type Props = Omit<MenuProps, 'open'> & {
    menuAnchor: null | HTMLElement;
    actions: Action[];
    onClose: () => void;
};

export const ActionMenu = ({ menuAnchor, actions, onClose, ...props }: Props) => {
    return (
        <Menu
            anchorEl={menuAnchor}
            open={menuAnchor !== null}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        >
            {actions
                .filter((a) => !a.hide)
                .map((action, idx) => {
                    if (!action.callback) {
                        return <Divider key={idx} />;
                    }

                    const ActionIcon = action.icon;

                    return (
                        <CustomMenuItem
                            key={idx}
                            onClick={() => {
                                onClose();
                                action.callback && action.callback();
                            }}
                            disableRipple
                        >
                            <ListItemIcon>{ActionIcon && <ActionIcon fontSize={'small'} />}</ListItemIcon>
                            <ListItemText>{action.name}</ListItemText>
                        </CustomMenuItem>
                    );
                })}
        </Menu>
    );
};
