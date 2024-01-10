import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Box, BoxProps, styled } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { RoutePath } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { DiscordAvatar } from '../../../atoms/data-display/DiscordAvatar';
import { ActionMenu } from '../../../atoms/navigation/menu/ActionMenu';

const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
        cursor: 'pointer',
    },
});

type Props = BoxProps & {
    logOut: () => void;
};

export const UserProfileButton = ({ logOut, ...boxProps }: Props) => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const menuOptions = [
        {
            icon: ManageAccountsOutlinedIcon,
            name: 'Account',
            callback: () => setLocation(RoutePath.Account),
        },
        {
            icon: AccountCircleOutlinedIcon,
            name: 'Profile',
            callback: () => setLocation(RoutePath.FlipProfile),
        },
        {
            icon: PeopleAltOutlinedIcon,
            name: 'Teams',
            callback: () => setLocation(RoutePath.Teams),
        },
        {
            name: '',
        },
        {
            icon: LogoutOutlinedIcon,
            name: 'Log out',
            callback: logOut,
        },
    ];

    return (
        <>
            <Container onClick={(event) => setMenuAnchor(event.currentTarget)} {...boxProps}>
                <DiscordAvatar
                    userId={user.id}
                    avatar={user.model.display.avatar}
                    sx={{ width: '36px', height: '36px' }}
                />
            </Container>
            <ActionMenu
                sx={{ marginTop: '8px' }}
                menuAnchor={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                actions={menuOptions}
            />
        </>
    );
};
