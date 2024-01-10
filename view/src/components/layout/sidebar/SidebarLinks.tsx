import { Permission } from '@flipguard/webapp-api';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import { Box, Divider, List, SvgIconProps } from '@mui/material';
import React, { ComponentType } from 'react';
import { useLocation } from 'wouter';

import { ROUTE_NAMES, RoutePath } from '../../../config/constants/navigation';
import { useFlipBotContext } from '../../../contexts/flipbot-context';
import { useTeamContext } from '../../../contexts/team-context';
import { useAuth } from '../../../hooks/use-auth';
import { SwordIcon } from '../../atoms/data-display/icons/SwordIcon';
import { Logo } from '../../branding/Logo';
import { SidebarFooter } from './SidebarFooter';
import { SidebarLinkButton, SidebarLinkButtonProps } from './SidebarLinkButton';
import { TeamSelect } from './TeamSelect';

type LinkGroup = {
    name: string;
    icon?: ComponentType<SvgIconProps>;
    requiredPerms?: Permission[];
    links: LinkMeta[];
    withTeamSelect?: boolean;
};

type LinkMeta = {
    name?: string;
    icon?: ComponentType<SvgIconProps>;
    path?: RoutePath;
    requiredPerms?: Permission[];
    requiredGuildConfig?: boolean;
    chipLabel?: SidebarLinkButtonProps['chipLabel'];
    hideInTeamScope?: boolean;
};

const LINK_GROUPS: LinkGroup[] = [
    {
        name: 'Explore',
        icon: ExploreOutlinedIcon,
        links: [
            {
                icon: ExploreOutlinedIcon,
                path: RoutePath.Explore,
            },
        ],
    },
    {
        name: 'Shop',
        icon: StorefrontOutlinedIcon,
        links: [
            {
                icon: StorefrontOutlinedIcon,
                path: RoutePath.Shop,
            },
        ],
    },
    {
        name: '',
        links: [],
    },
    {
        name: 'FlipSuite',
        icon: AndroidOutlinedIcon,
        withTeamSelect: true,
        links: [
            {
                name: 'FlipSuite',
            },
            {
                icon: SettingsOutlinedIcon,
                path: RoutePath.FlipBot,
                name: 'Configuration',
            },
            {
                name: 'Modules',
            },
            {
                icon: SwordIcon,
                path: RoutePath.FlipBotModuleRumble,
                requiredGuildConfig: true,
            },
            {
                icon: MonetizationOnOutlinedIcon,
                path: RoutePath.FlipBotModuleFlipping,
                requiredGuildConfig: true,
            },
            {
                icon: RepeatOutlinedIcon,
                path: RoutePath.FlipBotModuleRaiding,
                requiredGuildConfig: true,
            },
            {
                icon: ShoppingCartOutlinedIcon,
                path: RoutePath.FlipBotModuleShop,
                requiredGuildConfig: true,
            },
            {
                icon: TheaterComedyOutlinedIcon,
                path: RoutePath.FlipBotModuleTokenGating,
                requiredGuildConfig: true,
            },
        ],
    },
    {
        name: 'Tools',
        icon: ConstructionOutlinedIcon,
        withTeamSelect: true,
        links: [
            {
                name: 'Tools for NFT Projects',
            },
            {
                icon: InfoOutlinedIcon,
                path: RoutePath.ListingTrackers,
                hideInTeamScope: true,
            },
            {
                icon: DiamondOutlinedIcon,
                path: RoutePath.RarityBot,
                chipLabel: 'FREE',
                hideInTeamScope: true,
            },
            {
                icon: CircleNotificationsOutlinedIcon,
                path: RoutePath.SaleTrackers,
                hideInTeamScope: true,
            },
            {
                icon: CleaningServicesOutlinedIcon,
                path: RoutePath.SweepContests,
            },
            {
                name: 'Tools for NFT Collectors',
                hideInTeamScope: true,
            },
            {
                icon: NotificationsOutlinedIcon,
                path: RoutePath.AlertsBot,
                chipLabel: 'FREE',
                hideInTeamScope: true,
            },
            {
                icon: GavelOutlinedIcon,
                path: RoutePath.BiddingBots,
                requiredPerms: [Permission.ADMIN, Permission.BIDDING],
                hideInTeamScope: true,
            },
            {
                icon: GamesOutlinedIcon,
                path: RoutePath.SnipingBots,
                chipLabel: 'HOT',
                hideInTeamScope: true,
            },
            {
                name: 'Utilities',
                hideInTeamScope: true,
            },
            {
                icon: LocalFireDepartmentOutlinedIcon,
                path: RoutePath.Burners,
                hideInTeamScope: true,
            },
            {
                icon: WebhookOutlinedIcon,
                path: RoutePath.Integrations,
                hideInTeamScope: true,
            },
            {
                icon: DesignServicesOutlinedIcon,
                path: RoutePath.MessageTemplates,
                hideInTeamScope: true,
            },
            {
                name: 'Advanced',
                hideInTeamScope: true,
            },
            {
                icon: SmartToyOutlinedIcon,
                path: RoutePath.CustomBots,
                hideInTeamScope: true,
            },
            {
                icon: ExtensionOutlinedIcon,
                path: RoutePath.Extensions,
                hideInTeamScope: true,
            },
        ],
    },
    {
        name: '',
        links: [],
        requiredPerms: [Permission.ADMIN],
    },
    {
        name: 'Administration',
        icon: AdminPanelSettingsOutlinedIcon,
        requiredPerms: [Permission.ADMIN],
        links: [
            {
                name: 'Core',
            },
            {
                icon: CardGiftcardOutlinedIcon,
                path: RoutePath.AdminPanelGiftCodes,
                name: 'Gift Codes',
            },
            {
                icon: SaveOutlinedIcon,
                path: RoutePath.AdminPanelIndexer,
                name: 'Indexer',
            },
            {
                icon: SettingsOutlinedIcon,
                path: RoutePath.AdminPanelGeneral,
                name: 'Settings',
            },
            {
                name: 'FlipSuite',
            },
            {
                icon: Diversity3OutlinedIcon,
                path: RoutePath.AdminPanelFlipBotServers,
                name: 'Servers',
            },
            {
                icon: SettingsOutlinedIcon,
                path: RoutePath.AdminPanelFlipBotGeneral,
                name: 'Settings',
            },
            {
                name: 'FlipSuite Modules',
                requiredPerms: [Permission.ADMIN],
            },
            {
                icon: SwordIcon,
                path: RoutePath.AdminPanelFlipBotRumble,
                name: 'BattleGround',
            },
            {
                icon: MonetizationOnOutlinedIcon,
                path: RoutePath.AdminPanelFlipBotFlipping,
                name: 'CoinFlip',
            },
            {
                icon: RepeatOutlinedIcon,
                path: RoutePath.AdminPanelFlipBotRaiding,
                name: 'Raiding',
            },
            {
                icon: ShoppingCartOutlinedIcon,
                path: RoutePath.AdminPanelFlipBotShop,
                name: 'Shop',
            },
        ],
    },
];

type Props = {
    onClose: () => void;
};

export const SidebarLinks = ({ onClose }: Props) => {
    const [location, setLocation] = useLocation();
    const { scopedConfig } = useFlipBotContext();
    const { scopedTeam } = useTeamContext();
    const { user } = useAuth();

    const isGroupVisible = (g: LinkGroup) => {
        return !g.requiredPerms || user.hasOneOfPermissions(...g.requiredPerms);
    };

    const isLinkVisible = (l: LinkMeta) => {
        if (scopedTeam && l.hideInTeamScope) {
            return false;
        } else {
            return !l.requiredPerms || user.hasOneOfPermissions(...l.requiredPerms);
        }
    };

    const isLinkDisabled = (l: LinkMeta) => {
        return l.requiredGuildConfig && !scopedConfig;
    };

    const isGroupActive = (g: LinkGroup) => {
        return g.links.some((l) => l.path /*&& l.path !== '/'*/ && location.startsWith(l.path));
    };

    const visibleGroups = LINK_GROUPS.filter(isGroupVisible);
    const currentGroup = visibleGroups.find(isGroupActive) ?? LINK_GROUPS[0];
    const links = currentGroup.links;
    const visibleLinks = links.filter(isLinkVisible);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <Box sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => setLocation(RoutePath.Dashboard)}>
                    <Logo />
                </Box>
                <List component={'nav'} sx={{ flexGrow: 1 }}>
                    {visibleGroups.map((group, idx) => {
                        const firstLink = group.links.filter(isLinkVisible).find((l) => !!l.path) as { path: string };
                        if (!firstLink) {
                            return <Divider key={idx} sx={{ width: '50%', margin: '10px auto' }} />;
                        }

                        return (
                            <SidebarLinkButton
                                key={idx}
                                name={group.name}
                                icon={group.icon}
                                isGroup={true}
                                active={group.name === currentGroup.name}
                                onLinkClick={() => {
                                    setLocation(firstLink.path);
                                    if (group.links.filter(isLinkVisible).length === 1) {
                                        onClose();
                                    }
                                }}
                            />
                        );
                    })}
                </List>
                <SidebarFooter sx={{ margin: '16px 0px' }} />
            </Box>
            {visibleLinks.length > 1 && (
                <Box
                    sx={{
                        minWidth: '202px',
                        borderLeft: '1px solid #282828',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <List component={'nav'} sx={{ flexGrow: 1 }}>
                        {visibleLinks.map((link, idx) => {
                            const routeName = link.path ? ROUTE_NAMES[link.path] : (link.name as string);
                            return (
                                <SidebarLinkButton
                                    key={idx}
                                    name={link.name ?? routeName}
                                    icon={link.icon}
                                    path={link.path}
                                    chipLabel={link.chipLabel}
                                    disabled={isLinkDisabled(link)}
                                    onLinkClick={onClose}
                                />
                            );
                        })}
                    </List>
                    {currentGroup.withTeamSelect && (
                        <Box sx={{ margin: '16px', display: 'flex' }}>
                            <TeamSelect />
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
};
