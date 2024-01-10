import { MarketplaceChains } from '@flipguard/domain';
import { OrderItem, WalletChain } from '@flipguard/webapp-api';
import { Grid, styled, Typography } from '@mui/material';
import React from 'react';

import { SupportedMarketplaces } from '../../../components/molecules/marketplaces/SupportedMarketplaces';
import { ShopItem } from '../ShopItem';

const DescriptionText = styled(Typography)({
    fontSize: '14px',
});

type Props = {
    chain: WalletChain;
    setAreOrdersCancellable: (value: boolean) => void;
};

export const ShopIndividualTab = ({ chain, setAreOrdersCancellable }: Props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <Typography sx={{ fontSize: '19px', marginBottom: '4px' }}>Sniping Bots</Typography>
                <SupportedMarketplaces
                    chain={MarketplaceChains.POLYGON}
                    marketplaces={['Magic Eden', 'OnePlanet', 'OpenSea']}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.SNIPING_BOTS_1}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Allows you to run 1 more sniping bot</DescriptionText>
                            <DescriptionText>• Snipe NFTs as soon as they are listed</DescriptionText>
                            <DescriptionText>• Powerful filters</DescriptionText>
                            <DescriptionText>• Custom gas settings</DescriptionText>
                            <DescriptionText>• Auto transfer of sniped NFTs</DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                    learnMoreText={'Click to learn more about sniping bots'}
                    learnMoreLink={'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/sniping-bots'}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <Typography sx={{ fontSize: '19px', marginBottom: '4px' }}>BattleGround Autojoin Credits</Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.RUMBLE_EXTRA_AUTOJOINS_100}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Grants you 100 extra BG Autojoin Credits</DescriptionText>
                            <DescriptionText>• Join chosen BG arenas automatically</DescriptionText>
                            <DescriptionText>
                                • Manage via <span style={{ color: '#28b3dd', fontWeight: 500 }}>/bg-autojoins</span>{' '}
                                command
                            </DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.RUMBLE_EXTRA_AUTOJOINS_1250}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Grants you 1250 extra BG Autojoin Credits</DescriptionText>
                            <DescriptionText>• Join chosen BG arenas automatically</DescriptionText>
                            <DescriptionText>
                                • Manage via <span style={{ color: '#28b3dd', fontWeight: 500 }}>/bg-autojoins</span>{' '}
                                command
                            </DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={4} xl={4}>
                <ShopItem
                    chain={chain}
                    item={OrderItem.RUMBLE_EXTRA_AUTOJOINS_4000}
                    isActive={false}
                    description={
                        <>
                            <DescriptionText>• Grants you 4000 extra BG Autojoin Credits</DescriptionText>
                            <DescriptionText>• Join chosen BG arenas automatically</DescriptionText>
                            <DescriptionText>
                                • Manage via <span style={{ color: '#28b3dd', fontWeight: 500 }}>/bg-autojoins</span>{' '}
                                command
                            </DescriptionText>
                        </>
                    }
                    setAreOrdersCancellable={setAreOrdersCancellable}
                />
            </Grid>
        </Grid>
    );
};
