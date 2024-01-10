import { FlipBotModuleRaidingSettings } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React from 'react';

import { RaidsTable } from './components/table/RaidsTable';
import { RaidingRaidsTabHeader } from './RaidingRaidsTabHeader';

type Props = {
    configId: string;
    config: FlipBotModuleRaidingSettings;
};

export const RaidingRaidsTab = ({ config, configId }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <RaidingRaidsTabHeader config={config} />
            <RaidsTable configId={configId} raids={Object.values(config.raids)} />
        </Box>
    );
};
