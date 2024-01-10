import { Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { getRouteName } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { ConnectWalletButton } from '../components/ConnectWalletButton';
import { SignInButton } from '../components/SignInButton';
import { UserProfileButton } from '../components/UserProfileButton';
import { DesktopMuiAppBar } from './DesktopMuiAppBar';

type Props = {
    logOut: () => void;
};

export const DesktopTopbar = ({ logOut }: Props) => {
    const [location] = useLocation();
    const { authenticated } = useAuth();

    return (
        <DesktopMuiAppBar>
            <Toolbar>
                <Typography sx={{ fontSize: '23px', fontWeight: 400 }}>{getRouteName(location)}</Typography>
                <Typography sx={{ flexGrow: 1 }} />
                {authenticated ? (
                    <>
                        <ConnectWalletButton sx={{ marginRight: '20px' }} />
                        <UserProfileButton logOut={logOut} />
                    </>
                ) : (
                    <SignInButton />
                )}
            </Toolbar>
        </DesktopMuiAppBar>
    );
};
