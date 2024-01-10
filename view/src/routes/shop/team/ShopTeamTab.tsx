import { MarketplaceChains, VALID_MARKETPLACE_NAMES } from '@flipguard/domain';
import { OrderItem, Permission, WalletChain } from '@flipguard/webapp-api';
import { Grid, styled, Typography } from '@mui/material';
import React from 'react';

import { SupportedMarketplaces } from '../../../components/molecules/marketplaces/SupportedMarketplaces';
import { useAuth } from '../../../hooks/use-auth';
import { ShopItem } from '../ShopItem';

const TRACKERS_LEARN_MORE_LINK =
    'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/premium-listing-sales-trackers';

const DescriptionText = styled(Typography)({
    fontSize: '14px',
});

type Props = {
    chain: WalletChain;
    setAreOrdersCancellable: (value: boolean) => void;
};

export const ShopTeamTab = ({ chain, setAreOrdersCancellable }: Props) => {
    const { user } = useAuth();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <Typography sx={{ fontSize: '19px', marginBottom: '4px' }}>FlipSuite</Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.RAIDING_MODULE}
                    isActive={user.hasPermission(Permission.FLIPSUITE_RAIDING_MODULE)}
                    description={
                        <>
                            <DescriptionText>• Allows you to use FlipSuite Raiding Module</DescriptionText>
                            <DescriptionText>• Incentivize your community to raid Twitter</DescriptionText>
                            <DescriptionText>• Automatically reward raiders in Discord</DescriptionText>
                            <DescriptionText>• Multiple reward options</DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <Typography sx={{ fontSize: '19px', marginBottom: '4px' }}>
                    Premium Sales and Listings Trackers
                </Typography>
                <SupportedMarketplaces chain={MarketplaceChains.POLYGON} marketplaces={[...VALID_MARKETPLACE_NAMES]} />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.TRACKING_BOTS_1}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Allows you to run 1 more premium tracker</DescriptionText>
                            <DescriptionText>• Discord and Twitter support</DescriptionText>
                            <DescriptionText>• Custom message templates</DescriptionText>
                            <DescriptionText>• Unlimited activations</DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                    learnMoreText={'Click to learn more about trackers'}
                    learnMoreLink={TRACKERS_LEARN_MORE_LINK}
                    infoText={'Best choice if you only need a sales or listings tracker for your collection(s)'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.TRACKING_BOTS_3}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Allows you to run 3 more premium trackers</DescriptionText>
                            <DescriptionText>• Discord and Twitter support</DescriptionText>
                            <DescriptionText>• Custom message templates</DescriptionText>
                            <DescriptionText>• Unlimited activations</DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                    learnMoreText={'Click to learn more about trackers'}
                    learnMoreLink={TRACKERS_LEARN_MORE_LINK}
                    infoText={'Best choice if you need Discord and Twitter trackers for your collection(s)'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.TRACKING_BOTS_7}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Allows you to run 7 more premium trackers</DescriptionText>
                            <DescriptionText>• Discord and Twitter support</DescriptionText>
                            <DescriptionText>• Custom message templates</DescriptionText>
                            <DescriptionText>• Unlimited activations</DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                    learnMoreText={'Click to learn more about trackers'}
                    learnMoreLink={TRACKERS_LEARN_MORE_LINK}
                    infoText={'Best choice if you need trackers for multiple collections(s)'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <Typography sx={{ fontSize: '19px', marginBottom: '4px' }}>Sweep Contests</Typography>
                <SupportedMarketplaces
                    chain={MarketplaceChains.POLYGON}
                    marketplaces={VALID_MARKETPLACE_NAMES.filter((name) => name !== 'Maxis')}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.SWEEP_CONTESTS_1}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Allows you to run 1 more sweep contest</DescriptionText>
                            <DescriptionText>• Leaderboards updated in real-time</DescriptionText>
                            <DescriptionText>• Multiple sweep contest modes</DescriptionText>
                            <DescriptionText>• Wash trading detection</DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                    learnMoreText={'Click to learn more about sweep contests'}
                    learnMoreLink={'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/sweep-contests'}
                />
            </Grid>
        </Grid>
    );
};
