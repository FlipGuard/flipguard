import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import { PrimaryButton } from '../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomSelect } from '../../../../components/atoms/inputs/select/CustomSelect';
import { CustomLink } from '../../../../components/atoms/navigation/CustomLink';
import { Links } from '../../../../config/constants/links';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { FlipBotConfigurationCreateDialog } from './dialogs/FlipBotConfigurationCreateDialog';
import { FlipBotConfigurationMetadataCard } from './FlipBotConfigurationMetadataCard';
import { FlipBotConfigurationSettings } from './FlipBotConfigurationSettings';

export const FlipBotDashboardDetails = () => {
    const { scopedConfig, setScopedConfig, configs, isLoading } = useFlipBotContext();

    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const [creationDisabled, reason] = (() => {
        if (configs.length >= 3) {
            return [true, 'You cannot create more than 3 FlipSuite configurations'];
        } else {
            return [isLoading, ''];
        }
    })();

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <InfoOutlinedIcon sx={{ marginRight: '8px' }} />
                <Typography sx={{ fontSize: '20px' }}>Configuration Details</Typography>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '8px', gap: '8px' }}>
                <CustomSelect
                    sx={{ flexGrow: 1 }}
                    label={'Current configuration'}
                    options={configs.map((c) => ({ label: c.name, value: c.id }))}
                    value={scopedConfig?.id ?? ''}
                    onChange={(e) => setScopedConfig(e.target.value)}
                    disabled={configs.length === 0}
                    select
                />
                <PrimaryButton
                    sx={{ height: '40px' }}
                    onClick={() => setCreateDialogOpen(true)}
                    disabled={creationDisabled}
                    tooltipMessage={reason}
                    tooltipPlacement={'top'}
                >
                    Create new config
                </PrimaryButton>
            </Box>
            <FlipBotConfigurationMetadataCard guildConfig={scopedConfig} />
            <Box
                sx={{
                    marginTop: '8px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '8px',
                }}
            >
                <CustomLink href={Links.FlipSuiteSetup} target={'_blank'} customColor={'#aaa'}>
                    Setup Guide
                </CustomLink>
                <Box sx={{ borderLeft: '1px solid #444', height: '16px' }} />
                <CustomLink href={Links.FlipSuiteInviteLink} target={'_blank'} customColor={'#aaa'}>
                    Invite FlipSuite to your server
                </CustomLink>
            </Box>
            <FlipBotConfigurationSettings guildConfig={scopedConfig} />
            <FlipBotConfigurationCreateDialog isOpen={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
        </Box>
    );
};
