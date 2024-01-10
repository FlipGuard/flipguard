import { FlipBotGlobalConfigGetDto } from '@flipguard/webapp-api';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { Box, InputAdornment } from '@mui/material';
import React, { useState } from 'react';

import { useGlobalGuildSettingsSyncMutation } from '../../../../api/mutations/flipbot-global-config';
import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { AddGuildGlobalConfigDialog } from './components/AddGuildGlobalConfigDialog';
import { GuildGlobalSettingsTable } from './table/GuildGlobalSettingsTable';

type Props = {
    settings: FlipBotGlobalConfigGetDto;
};

export const AdminPanelGlobalGuildsSettingsTab = ({ settings }: Props) => {
    const isMobile = isViewMobile();

    const syncGuildsInfoMutation = useGlobalGuildSettingsSyncMutation();

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [searchText, setSearchTest] = useState('');

    const onSync = () => {
        syncGuildsInfoMutation.mutate();
    };

    const existingGuildIds = Object.keys(settings.guilds);

    const allGuilds = Object.values(settings.guilds);
    const filtered = Object.fromEntries(
        allGuilds
            .filter((g) => g.guildId.includes(searchText) || g.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((g) => [g.guildId, g]),
    );

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: isMobile ? '0px' : '16px',
                    marginBottom: '24px',
                }}
            >
                <CustomTextField
                    sx={{ flexGrow: 1, marginBottom: '8px' }}
                    placeholder={'Search'}
                    value={searchText}
                    onChange={(e) => setSearchTest(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon sx={{ color: '#666' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <TertiaryButton
                    sx={{ height: '40px', marginLeft: '16px', marginBottom: '8px' }}
                    onClick={onSync}
                    loading={syncGuildsInfoMutation.isLoading}
                    icon={SyncOutlinedIcon}
                >
                    Sync
                </TertiaryButton>
                <PrimaryButton
                    sx={{ height: '40px', marginLeft: '16px', marginBottom: '8px' }}
                    onClick={() => setAddDialogOpen(true)}
                >
                    Add server
                </PrimaryButton>
            </Box>
            <GuildGlobalSettingsTable guilds={filtered} />
            <AddGuildGlobalConfigDialog
                existingGuildIds={existingGuildIds}
                isOpen={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
            />
        </>
    );
};
