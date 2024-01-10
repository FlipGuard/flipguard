import { FlipBotGuildConfigModules } from '@flipguard/webapp-api';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';

import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { ModuleStatusChip } from './ModuleStatusChip';

type ModuleKey = keyof FlipBotGuildConfigModules | 'tracking';

const MODULE_NAMES: Record<ModuleKey, string> = {
    flipping: 'CoinFlip',
    rumble: 'BattleGround',
    raiding: 'Raiding',
    shop: 'Shop',
    tracking: 'Tracking',
    tokenGating: 'TokenGating',
};

export const FlipBotDashboardModuleInfo = () => {
    const { scopedConfig } = useFlipBotContext();

    const guildConfigModules = {
        ...scopedConfig?.modules,
        tracking: { enabled: true },
    };

    const modules: [string, { enabled: boolean }][] = scopedConfig
        ? Object.entries(guildConfigModules).map(([key, value]) => [MODULE_NAMES[key as ModuleKey], value])
        : [];

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <DashboardCustomizeOutlinedIcon sx={{ marginRight: '8px' }} />
                <Typography sx={{ fontSize: '20px' }}>Modules</Typography>
            </Box>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '10px 16px 8px 16px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography>Installed modules:</Typography>
                    <Typography>{`${modules.length}/${Object.keys(MODULE_NAMES).length}`}</Typography>
                </Box>
                <Divider sx={{ margin: '8px 0' }} />
                <Box>
                    {[...modules]
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([key, { enabled }], idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography sx={{ fontSize: '14px', color: '#aaa' }}>{key}</Typography>
                                <ModuleStatusChip enabled={enabled} />
                            </Box>
                        ))}
                </Box>
            </Card>
        </Box>
    );
};
