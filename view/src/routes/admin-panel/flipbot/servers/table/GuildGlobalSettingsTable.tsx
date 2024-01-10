import { FlipBotGlobalGuildConfig } from '@flipguard/webapp-api';
import React from 'react';

import { CustomTable } from '../../../../../components/molecules/table/CustomTable';
import { GuildGlobalSettingsTableHeader } from './GuildGlobalSettingsTableHeader';
import { GuildGlobalSettingsTableRow } from './GuildGlobalSettingsTableRow';

type Props = {
    guilds: Record<string, FlipBotGlobalGuildConfig>;
};

export const GuildGlobalSettingsTable = ({ guilds }: Props) => {
    const guildsSettings = Object.values(guilds).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <CustomTable header={GuildGlobalSettingsTableHeader} loading={false}>
            {guildsSettings.map((settings) => (
                <GuildGlobalSettingsTableRow key={settings.guildId} settings={settings} />
            ))}
        </CustomTable>
    );
};
