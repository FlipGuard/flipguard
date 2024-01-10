import { ActionType, ReceivedItemModel } from '@flipguard/webapp-api';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Card, CardProps, Divider, Grid, styled, Typography } from '@mui/material';
import React from 'react';

import { CustomLink } from '../../../components/atoms/navigation/CustomLink';
import { HeaderBox } from '../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../components/atoms/utils/HeaderText';
import { NoDataFallback } from '../../../components/molecules/utils/NoDataFallback';
import { RoutePath } from '../../../config/constants/navigation';
import { useAuth } from '../../../hooks/use-auth';
import { ActiveItem } from './ActiveItem';

const StyledCard = styled(Card)({
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 8px',
    paddingBottom: '4px',
});

export const AccountGeneralTabCard = (props: CardProps) => {
    const { user } = useAuth();

    const activeBots = Object.values(user.metadata.bots).filter((b) => b.active);
    const trackersCount = activeBots.filter((b) => !b.usedActions.includes(ActionType.AUTOBUY.value)).length;
    const snipingBotsCount = activeBots.filter((b) => b.usedActions.includes(ActionType.AUTOBUY.value)).length;
    const biddingBotsCount = Object.values(user.metadata.biddingBots).filter((b) => b.active).length;
    const sweepContestsCount = Object.values(user.metadata.sweepContests).filter((sc) => sc.active).length;
    const { maxTrackingBots, maxSnipingBots, maxBiddingBots, maxSweepContests } = user.limits;

    const now = Date.now();

    const activeItems = user.items.filter((i) => now < i.expiresAt);
    const mergedItems: ReceivedItemModel[] = [];

    for (const item of activeItems) {
        const prevItemIdx = mergedItems.findIndex((i) => i.type === item.type);
        if (prevItemIdx !== -1 && mergedItems[prevItemIdx].expiresAt === item.activeSince) {
            mergedItems[prevItemIdx] = { ...item, activeSince: mergedItems[prevItemIdx].activeSince };
        } else {
            mergedItems.push(item);
        }
    }

    mergedItems.sort((a, b) => a.expiresAt - b.expiresAt);

    return (
        <StyledCard {...props}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <HeaderBox sx={{ marginTop: 0 }}>
                        <InfoOutlinedIcon />
                        <HeaderText>Your account limits</HeaderText>
                    </HeaderBox>
                    <LimitBox label={'Trackers'} left={trackersCount} right={maxTrackingBots} />
                    <LimitBox label={'Sniping Bots'} left={snipingBotsCount} right={maxSnipingBots} />
                    <LimitBox label={'Bidding Bots'} left={biddingBotsCount} right={maxBiddingBots} />
                    <LimitBox label={'Sweep Contests'} left={sweepContestsCount} right={maxSweepContests} />
                    <Divider sx={{ margin: '8px 8px 0px 8px' }} />
                    <Box sx={{ margin: '8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', marginRight: '4px' }}>
                            Want to increase your limits?
                        </Typography>
                        <CustomLink href={RoutePath.Shop}>Head over to the shop</CustomLink>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <HeaderBox sx={{ marginTop: 0, marginBottom: '12px' }}>
                        <BackpackOutlinedIcon />
                        <HeaderText>Inventory</HeaderText>
                    </HeaderBox>
                    {mergedItems.length === 0 ? (
                        <NoDataFallback sx={{ marginTop: '32px' }} text={"You don't have any active items"} />
                    ) : (
                        <Box>
                            {mergedItems.map((i, idx) => (
                                <ActiveItem item={i} key={idx} />
                            ))}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </StyledCard>
    );
};

type LimitBoxProps = {
    label: string;
    left: number;
    right: number;
};

const LimitBox = ({ left, right, label }: LimitBoxProps) => {
    return (
        <Box sx={{ margin: '0 8px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <Typography>{label}</Typography>
            <Typography sx={{ flexGrow: 1 }} />
            <Typography>{`${left}/${right}`}</Typography>
        </Box>
    );
};
