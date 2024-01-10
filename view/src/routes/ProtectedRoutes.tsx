import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch as SwitchRouter } from 'wouter';

import { FallbackProgress } from '../components/molecules/utils/FallbackProgress';
import { RoutePath } from '../config/constants/navigation';

const AccountRoute = lazy(() =>
    import('./account/AccountRoute').then(({ AccountRoute }) => ({
        default: AccountRoute,
    })),
);

const AdminPanelGiftCodesRoute = lazy(() =>
    import('./admin-panel/gift-codes/GiftCodesRoute').then(({ AdminPanelGiftCodesRoute }) => ({
        default: AdminPanelGiftCodesRoute,
    })),
);

const AdminPanelIndexerRoute = lazy(() =>
    import('./admin-panel/indexer/IndexerRoute').then(({ AdminPanelIndexerRoute }) => ({
        default: AdminPanelIndexerRoute,
    })),
);

const AdminPanelGlobalConfigurationRoute = lazy(() =>
    import('./admin-panel/global-configuration/GlobalConfigurationRoute').then(
        ({ AdminPanelGlobalConfigurationRoute }) => ({
            default: AdminPanelGlobalConfigurationRoute,
        }),
    ),
);

const AdminPanelFlipBotConfigGeneralRoute = lazy(() =>
    import('./admin-panel/flipbot/general/AdminPanelFlipBotConfigGeneralRoute').then(
        ({ AdminPanelFlipBotConfigGeneralRoute }) => ({
            default: AdminPanelFlipBotConfigGeneralRoute,
        }),
    ),
);

const AdminPanelFlipBotConfigFlippingRoute = lazy(() =>
    import('./admin-panel/flipbot/flipping/AdminPanelFlipBotConfigFlippingRoute').then(
        ({ AdminPanelFlipBotConfigFlippingRoute }) => ({
            default: AdminPanelFlipBotConfigFlippingRoute,
        }),
    ),
);

const AdminPanelFlipBotConfigRaidingRoute = lazy(() =>
    import('./admin-panel/flipbot/raiding/AdminPanelFlipBotConfigRaidingRoute').then(
        ({ AdminPanelFlipBotConfigRaidingRoute }) => ({
            default: AdminPanelFlipBotConfigRaidingRoute,
        }),
    ),
);

const AdminPanelFlipBotConfigRumbleRoute = lazy(() =>
    import('./admin-panel/flipbot/rumble/AdminPanelFlipBotConfigRumbleRoute').then(
        ({ AdminPanelFlipBotConfigRumbleRoute }) => ({
            default: AdminPanelFlipBotConfigRumbleRoute,
        }),
    ),
);

const AdminPanelFlipBotConfigShopRoute = lazy(() =>
    import('./admin-panel/flipbot/shop/AdminPanelFlipBotConfigShopRoute').then(
        ({ AdminPanelFlipBotConfigShopRoute }) => ({
            default: AdminPanelFlipBotConfigShopRoute,
        }),
    ),
);

const AdminPanelFlipBotConfigServersRoute = lazy(() =>
    import('./admin-panel/flipbot/servers/AdminPanelFlipBotConfigServersRoute').then(
        ({ AdminPanelFlipBotConfigServersRoute }) => ({
            default: AdminPanelFlipBotConfigServersRoute,
        }),
    ),
);

const AlertsBotRoute = lazy(() =>
    import('./alerts-bot/AlertsBotRoute').then(({ AlertsBotRoute }) => ({
        default: AlertsBotRoute,
    })),
);

const BiddingBotsRoute = lazy(() =>
    import('./bidding-bots/BiddingBotsRoute').then(({ BiddingBotsRoute }) => ({
        default: BiddingBotsRoute,
    })),
);

const BiddingBotsCreateRoute = lazy(() =>
    import('./bidding-bots-create/BiddingBotsCreateRoute').then(({ BiddingBotsCreateRoute }) => ({
        default: BiddingBotsCreateRoute,
    })),
);

const BiddingBotsEditRoute = lazy(() =>
    import('./bidding-bots-edit/BiddingBotsEditRoute').then(({ BiddingBotsEditRoute }) => ({
        default: BiddingBotsEditRoute,
    })),
);

const BiddingBotsWalletRoute = lazy(() =>
    import('./bidding-bots-wallet/BiddingBotsWalletRoute').then(({ BiddingBotsWalletRoute }) => ({
        default: BiddingBotsWalletRoute,
    })),
);

const BurnersRoute = lazy(() =>
    import('./burners/BurnersRoute').then(({ BurnersRoute }) => ({
        default: BurnersRoute,
    })),
);

const BurnersCreateRoute = lazy(() =>
    import('./burners-create/BurnersCreateRoute').then(({ BurnersCreateRoute }) => ({
        default: BurnersCreateRoute,
    })),
);

const BurnersEditRoute = lazy(() =>
    import('./burners-edit/BurnersEditRoute').then(({ BurnersEditRoute }) => ({
        default: BurnersEditRoute,
    })),
);

const CoinFlipRoomExplorerRoute = lazy(() =>
    import('./games/coinflip/CoinFlipRoomExplorerRoute').then(({ CoinFlipRoomExplorerRoute }) => ({
        default: CoinFlipRoomExplorerRoute,
    })),
);

const CoinFlipDashboardRoute = lazy(() =>
    import('./games/coinflip/CoinFlipDashboardRoute').then(({ CoinFlipDashboardRoute }) => ({
        default: CoinFlipDashboardRoute,
    })),
);

const CustomBotsRoute = lazy(() =>
    import('./custom-bots/CustomBotsRoute').then(({ CustomBotsRoute }) => ({
        default: CustomBotsRoute,
    })),
);

const CustomBotsCreateRoute = lazy(() =>
    import('./custom-bots-create/CustomBotsCreateRoute').then(({ CustomBotsCreateRoute }) => ({
        default: CustomBotsCreateRoute,
    })),
);

const CustomBotsEditRoute = lazy(() =>
    import('./custom-bots-edit/CustomBotsEditRoute').then(({ CustomBotsEditRoute }) => ({
        default: CustomBotsEditRoute,
    })),
);

const ExtensionsRoute = lazy(() =>
    import('./extensions/ExtensionsRoute').then(({ ExtensionsRoute }) => ({
        default: ExtensionsRoute,
    })),
);

const ExtensionsCreateRoute = lazy(() =>
    import('./extensions-add/ExtensionsCreateRoute').then(({ ExtensionsCreateRoute }) => ({
        default: ExtensionsCreateRoute,
    })),
);

const ExtensionsEditRoute = lazy(() =>
    import('./extensions-edit/ExtensionsEditRoute').then(({ ExtensionsEditRoute }) => ({
        default: ExtensionsEditRoute,
    })),
);

const FlipBotDashboardRoute = lazy(() =>
    import('./flipbot/dashboard/FlipBotDashboardRoute').then(({ FlipBotDashboardRoute }) => ({
        default: FlipBotDashboardRoute,
    })),
);

const FlipBotFlippingModuleRoute = lazy(() =>
    import('./flipbot/modules/flipping/FlipBotFlippingModuleRoute').then(({ FlipBotFlippingModuleRoute }) => ({
        default: FlipBotFlippingModuleRoute,
    })),
);

const FlipBotRaidingModuleRoute = lazy(() =>
    import('./flipbot/modules/raiding/FlipBotRaidingModuleRoute').then(({ FlipBotRaidingModuleRoute }) => ({
        default: FlipBotRaidingModuleRoute,
    })),
);

const FlipBotRaidingRaidsCreateRoute = lazy(() =>
    import('./flipbot/modules/raiding/tabs/raids/routes/RaidingRaidsCreateRoute').then(
        ({ RaidingRaidsCreateRoute }) => ({
            default: RaidingRaidsCreateRoute,
        }),
    ),
);

const FlipBotRaidingRaidsViewRoute = lazy(() =>
    import('./flipbot/modules/raiding/tabs/raids/routes/RaidingRaidsViewRoute').then(({ RaidingRaidsViewRoute }) => ({
        default: RaidingRaidsViewRoute,
    })),
);

const FlipBotRumbleModuleRoute = lazy(() =>
    import('./flipbot/modules/rumble/FlipBotRumbleModuleRoute').then(({ FlipBotRumbleModuleRoute }) => ({
        default: FlipBotRumbleModuleRoute,
    })),
);

const FlipBotShopModuleRoute = lazy(() =>
    import('./flipbot/modules/shop/FlipBotShopModuleRoute').then(({ FlipBotShopModuleRoute }) => ({
        default: FlipBotShopModuleRoute,
    })),
);

const FlipBotTokenGatingModuleRoute = lazy(() =>
    import('./flipbot/modules/token-gating/FlipBotTokenGatingModuleRoute').then(
        ({ FlipBotTokenGatingModuleRoute }) => ({
            default: FlipBotTokenGatingModuleRoute,
        }),
    ),
);

const FlipProfileRoute = lazy(() =>
    import('./flipprofile/FlipProfileRoute').then(({ FlipProfileRoute }) => ({
        default: FlipProfileRoute,
    })),
);

const ListingTrackersRoute = lazy(() =>
    import('./listing-trackers/ListingTrackersRoute').then(({ ListingTrackersRoute }) => ({
        default: ListingTrackersRoute,
    })),
);

const ListingTrackersCreateRoute = lazy(() =>
    import('./listing-trackers-create/ListingTrackersCreateRoute').then(({ ListingTrackersCreateRoute }) => ({
        default: ListingTrackersCreateRoute,
    })),
);

const ListingTrackersEditRoute = lazy(() =>
    import('./listing-trackers-edit/ListingTrackersEditRoute').then(({ ListingTrackersEditRoute }) => ({
        default: ListingTrackersEditRoute,
    })),
);

const DiscordRarityBotRoute = lazy(() =>
    import('./rarity-bot/DiscordRarityBotRoute').then(({ DiscordRarityBotRoute }) => ({
        default: DiscordRarityBotRoute,
    })),
);

const SaleTrackersRoute = lazy(() =>
    import('./sale-trackers/SaleTrackersRoute').then(({ SaleTrackersRoute }) => ({
        default: SaleTrackersRoute,
    })),
);

const SaleTrackersCreateRoute = lazy(() =>
    import('./sale-trackers-create/SaleTrackersCreateRoute').then(({ SaleTrackersCreateRoute }) => ({
        default: SaleTrackersCreateRoute,
    })),
);

const SaleTrackersEditRoute = lazy(() =>
    import('./sale-trackers-edit/SaleTrackersEditRoute').then(({ SaleTrackersEditRoute }) => ({
        default: SaleTrackersEditRoute,
    })),
);

const SnipingBotsRoute = lazy(() =>
    import('./sniping-bots/SnipingBotsRoute').then(({ SnipingBotsRoute }) => ({
        default: SnipingBotsRoute,
    })),
);

const SnipingBotsCreateRoute = lazy(() =>
    import('./sniping-bots-create/SnipingBotsCreateRoute').then(({ SnipingBotsCreateRoute }) => ({
        default: SnipingBotsCreateRoute,
    })),
);

const SnipingBotsEditRoute = lazy(() =>
    import('./sniping-bots-edit/SnipingBotsEditRoute').then(({ SnipingBotsEditRoute }) => ({
        default: SnipingBotsEditRoute,
    })),
);

const MessageTemplatesRoute = lazy(() =>
    import('./message-templates/MessageTemplatesRoute').then(({ MessageTemplatesRoute }) => ({
        default: MessageTemplatesRoute,
    })),
);

const MessageTemplatesAddRoute = lazy(() =>
    import('./message-templates-add/MessageTemplatesAddRoute').then(({ MessageTemplatesAddRoute }) => ({
        default: MessageTemplatesAddRoute,
    })),
);

const MessageTemplatesEditRoute = lazy(() =>
    import('./message-templates-edit/MessageTemplatesEditRoute').then(({ MessageTemplatesEditRoute }) => ({
        default: MessageTemplatesEditRoute,
    })),
);

const IntegrationsRoute = lazy(() =>
    import('./integrations/IntegrationsRoute').then(({ IntegrationsRoute }) => ({ default: IntegrationsRoute })),
);

const IntegrationsAddRoute = lazy(() =>
    import('./integrations-add/IntegrationsAddRoute').then(({ IntegrationsAddRoute }) => ({
        default: IntegrationsAddRoute,
    })),
);

const IntegrationsEditRoute = lazy(() =>
    import('./integrations-edit/IntegrationsEditRoute').then(({ IntegrationsEditRoute }) => ({
        default: IntegrationsEditRoute,
    })),
);

const ShopRoute = lazy(() =>
    import('./shop/ShopRoute').then(({ ShopRoute }) => ({
        default: ShopRoute,
    })),
);

const SweepContestsRoute = lazy(() =>
    import('./sweep-contests/SweepContestsRoute').then(({ SweepContestsRoute }) => ({
        default: SweepContestsRoute,
    })),
);

const SweepContestsCreateRoute = lazy(() =>
    import('./sweep-contests-create/SweepContestsCreateRoute').then(({ SweepContestsCreateRoute }) => ({
        default: SweepContestsCreateRoute,
    })),
);

const SweepContestsEditRoute = lazy(() =>
    import('./sweep-contests-edit/SweepContestsEditRoute').then(({ SweepContestsEditRoute }) => ({
        default: SweepContestsEditRoute,
    })),
);

const SweepContestsLeaderboardRoute = lazy(() =>
    import('./sweep-contests-leaderboard/SweepContestsLeaderboardRoute').then(({ SweepContestsLeaderboardRoute }) => ({
        default: SweepContestsLeaderboardRoute,
    })),
);

const TeamsRoute = lazy(() =>
    import('./teams/TeamsRoute').then(({ TeamsRoute }) => ({
        default: TeamsRoute,
    })),
);

const TeamEditRoute = lazy(() =>
    import('./teams/edit/TeamEditRoute').then(({ TeamEditRoute }) => ({
        default: TeamEditRoute,
    })),
);

export const ProtectedRoutes = () => {
    return (
        <SwitchRouter>
            <Route path={RoutePath.Account + '/:path*'}>
                <Suspense fallback={<FallbackProgress />}>
                    <AccountRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelFlipBotGeneral}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelFlipBotConfigGeneralRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelFlipBotServers}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelFlipBotConfigServersRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelFlipBotFlipping}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelFlipBotConfigFlippingRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelFlipBotRaiding}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelFlipBotConfigRaidingRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelFlipBotRumble}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelFlipBotConfigRumbleRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelFlipBotShop}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelFlipBotConfigShopRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelGiftCodes}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelGiftCodesRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelIndexer}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelIndexerRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AdminPanelGeneral}>
                <Suspense fallback={<FallbackProgress />}>
                    <AdminPanelGlobalConfigurationRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.AlertsBot}>
                <Suspense fallback={<FallbackProgress />}>
                    <AlertsBotRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.BiddingBots}>
                <Suspense fallback={<FallbackProgress />}>
                    <BiddingBotsRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.BiddingBotsCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <BiddingBotsCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.BiddingBotsEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <BiddingBotsEditRoute botId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.BiddingBotsWallet + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <BiddingBotsWalletRoute botId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.Burners}>
                <Suspense fallback={<FallbackProgress />}>
                    <BurnersRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.BurnersCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <BurnersCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.BurnersEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <BurnersEditRoute burnerId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.Explore}>
                <Suspense fallback={<FallbackProgress />}>
                    <CoinFlipRoomExplorerRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.Explore + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <CoinFlipDashboardRoute roomId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.Extensions}>
                <Suspense fallback={<FallbackProgress />}>
                    <ExtensionsRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.ExtensionsCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <ExtensionsCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.ExtensionsEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <ExtensionsEditRoute extensionId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.FlipBot}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipBotDashboardRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipBotModuleFlipping}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipBotFlippingModuleRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipBotModuleRaiding}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipBotRaidingModuleRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipBotModuleRaidingCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipBotRaidingRaidsCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipBotModuleRaidingView + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <FlipBotRaidingRaidsViewRoute raidId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.FlipBotModuleRumble}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipBotRumbleModuleRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipBotModuleShop}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipBotShopModuleRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipBotModuleTokenGating}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipBotTokenGatingModuleRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipProfile}>
                <Suspense fallback={<FallbackProgress />}>
                    <FlipProfileRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.FlipProfile + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <FlipProfileRoute userId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.ListingTrackers}>
                <Suspense fallback={<FallbackProgress />}>
                    <ListingTrackersRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.ListingTrackersCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <ListingTrackersCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.ListingTrackersEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <ListingTrackersEditRoute botId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.RarityBot}>
                <Suspense fallback={<FallbackProgress />}>
                    <DiscordRarityBotRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.SaleTrackers}>
                <Suspense fallback={<FallbackProgress />}>
                    <SaleTrackersRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.SaleTrackersCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <SaleTrackersCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.SaleTrackersEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <SaleTrackersEditRoute botId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.SnipingBotsCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <SnipingBotsCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.SnipingBotsEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <SnipingBotsEditRoute botId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.SnipingBots + '/:path*'}>
                <Suspense fallback={<FallbackProgress />}>
                    <SnipingBotsRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.CustomBots}>
                <Suspense fallback={<FallbackProgress />}>
                    <CustomBotsRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.CustomBotsCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <CustomBotsCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.CustomBotsEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <CustomBotsEditRoute botId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.MessageTemplatesAdd}>
                <Suspense fallback={<FallbackProgress />}>
                    <MessageTemplatesAddRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.MessageTemplatesEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <MessageTemplatesEditRoute templateId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.MessageTemplates}>
                <Suspense fallback={<FallbackProgress />}>
                    <MessageTemplatesRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.IntegrationsAdd}>
                <Suspense fallback={<FallbackProgress />}>
                    <IntegrationsAddRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.IntegrationsEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <IntegrationsEditRoute integrationId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.Integrations}>
                <Suspense fallback={<FallbackProgress />}>
                    <IntegrationsRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.Shop + '/:path*'}>
                <Suspense fallback={<FallbackProgress />}>
                    <ShopRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.SweepContests}>
                <Suspense fallback={<FallbackProgress />}>
                    <SweepContestsRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.SweepContestsCreate}>
                <Suspense fallback={<FallbackProgress />}>
                    <SweepContestsCreateRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.SweepContestsEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <SweepContestsEditRoute sweepContestId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.SweepContests + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <SweepContestsLeaderboardRoute sweepContestId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route path={RoutePath.Teams}>
                <Suspense fallback={<FallbackProgress />}>
                    <TeamsRoute />
                </Suspense>
            </Route>
            <Route path={RoutePath.TeamsEdit + '/:id'}>
                {(params) => (
                    <Suspense fallback={<FallbackProgress />}>
                        <TeamEditRoute teamId={decodeURI(params.id as string)} />
                    </Suspense>
                )}
            </Route>
            <Route>
                <Redirect to={RoutePath.FlipProfile} />
            </Route>
        </SwitchRouter>
    );
};
