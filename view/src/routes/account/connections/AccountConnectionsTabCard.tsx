import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { Card, CardProps, styled } from '@mui/material';
import React from 'react';

import { HeaderBox } from '../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../components/atoms/utils/HeaderText';
import { LinkedSocialsTabCard } from './LinkedSocialsTabCard';
import { LinkedWalletsTabCard } from './LinkedWalletsTabCard';

const StyledCard = styled(Card)({
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 8px',
    paddingBottom: '4px',
});

export const AccountConnectionsTabCard = (props: CardProps) => {
    return (
        <StyledCard {...props}>
            <HeaderBox sx={{ marginTop: 0 }}>
                <AccountBalanceWalletOutlinedIcon />
                <HeaderText>Wallets</HeaderText>
            </HeaderBox>
            <LinkedWalletsTabCard />
            <HeaderBox>
                <BadgeOutlinedIcon />
                <HeaderText>Socials</HeaderText>
            </HeaderBox>
            <LinkedSocialsTabCard />
        </StyledCard>
    );
};
