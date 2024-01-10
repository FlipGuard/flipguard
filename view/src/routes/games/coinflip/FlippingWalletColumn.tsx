import { FlippingRoomDto, SUPPORTED_FLIPBOT_TOKENS } from '@flipguard/webapp-api';
import { Card, Divider, styled } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../hooks/use-auth';
import { useBalances } from '../../../hooks/use-balances';
import { LevelProgressBar } from '../../flipprofile/avatar/LevelProgressBar';
import { ProfitBox } from './components/ProfitBox';
import { FlipButtonCard } from './FlipButtonCard';
import { FlipWalletBalanceCard } from './FlipWalletBalanceCard';

const BALANCE_FETCH_INTERVAL = 6000;

const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
});

type Props = {
    flippingRoom: FlippingRoomDto;
};

export const FlippingWalletColumn = ({ flippingRoom }: Props) => {
    const { flipProfile } = useAuth();

    const supportedTokens = Object.keys(flippingRoom.flippingAmounts);
    const tokensToShow = SUPPORTED_FLIPBOT_TOKENS.filter((tk) => supportedTokens.includes(tk));

    const [chosenToken, setChosenToken] = useState(tokensToShow[0]);

    const { balances, refetchBalances } = useBalances(['MATIC', chosenToken], flipProfile.walletAddress);

    useEffect(() => {
        const timer = setInterval(refetchBalances, BALANCE_FETCH_INTERVAL);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <StyledCard sx={{ justifyContent: 'center', height: '40px', marginBottom: '8px', padding: '0 16px' }}>
                <ProfitBox chosenToken={chosenToken} />
            </StyledCard>
            <StyledCard sx={{ padding: '8px' }}>
                <FlipButtonCard
                    flippingRoom={flippingRoom}
                    flippingAmounts={flippingRoom.flippingAmounts}
                    balances={balances}
                    chosenToken={chosenToken}
                    setChosenToken={setChosenToken}
                />
                <Divider sx={{ margin: '16px 8px 8px 8px' }} />
                <LevelProgressBar sx={{ margin: '8px 8px 16px 8px' }} flipProfile={flipProfile} />
                <FlipWalletBalanceCard balances={balances} />
            </StyledCard>
        </>
    );
};
