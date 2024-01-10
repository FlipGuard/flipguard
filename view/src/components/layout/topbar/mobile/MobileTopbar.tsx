import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

import { useAuth } from '../../../../hooks/use-auth';
import { ConnectWalletButton } from '../components/ConnectWalletButton';
import { SignInButton } from '../components/SignInButton';
import { UserProfileButton } from '../components/UserProfileButton';
import { MobileMuiAppBar } from './MobileMuiAppBar';

type Props = {
    logOut: () => void;
    toggleSidebar: () => void;
};

export const MobileTopbar = ({ logOut, toggleSidebar }: Props) => {
    const { authenticated } = useAuth();

    return (
        <MobileMuiAppBar>
            <Toolbar>
                <IconButton onClick={toggleSidebar}>
                    <MenuOutlinedIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1 }} />
                {authenticated ? (
                    <>
                        <ConnectWalletButton />
                        <Typography sx={{ flexGrow: 1 }} />
                        <UserProfileButton logOut={logOut} />
                    </>
                ) : (
                    <SignInButton />
                )}
            </Toolbar>
        </MobileMuiAppBar>
    );
};
