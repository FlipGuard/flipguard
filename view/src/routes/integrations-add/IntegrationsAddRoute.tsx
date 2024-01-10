import {
    DiscordWebhook,
    Integration,
    IntegrationCreateDto,
    IntegrationType,
    TwitterBotSecrets,
    Webhook,
} from '@flipguard/webapp-api';
import SaveIcon from '@mui/icons-material/Save';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useIntegrationAddMutation } from '../../api/mutations/integrations';
import { DiscordIcon } from '../../components/atoms/data-display/icons/DiscordIcon';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { useValidateIntegration } from '../../hooks/validation/integration';
import { IntegrationHeaderBox, IntegrationHeaderText } from '../integrations/utils/IntegrationUtils';
import { IntegrationConfigForm } from './IntegrationConfigForm';
import { IntegrationConfigMetadataSection } from './IntegrationConfigMetadataSection';

const INITIAL_INTEGRATION: Integration = {
    id: '',
    type: IntegrationType.DISCORD_WEBHOOK,
    description: '',
    value: {
        webhook: '',
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
};

const isUndefined = (integration: Integration) => {
    if (integration.type === IntegrationType.DISCORD_WEBHOOK) {
        const value = integration.value as DiscordWebhook;
        return value.webhook === '';
    }

    if (integration.type === IntegrationType.TWITTER_BOT) {
        const value = integration.value as TwitterBotSecrets;
        const { apiKey, apiSecret, accessTokenKey, accessTokenSecret } = value;
        return apiKey === '' || apiSecret === '' || accessTokenKey === '' || accessTokenSecret === '';
    }

    if (integration.type === IntegrationType.WEBHOOK) {
        const value = integration.value as Webhook;
        return value.url === '';
    }

    return false;
};

export const IntegrationsAddRoute = () => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();
    const addMutation = useIntegrationAddMutation();

    const [integration, setIntegration] = useState<Integration>(INITIAL_INTEGRATION);
    const [idError, setIdError] = useState('');

    const saveDisabled = integration.id === '' || isUndefined(integration);
    const idValidationError = useValidateIntegration(integration.id);

    const onAdd = () => {
        const dto: IntegrationCreateDto = {
            id: integration.id,
            type: integration.type,
            value: integration.value,
            description: integration.description ?? '',
        } as IntegrationCreateDto;

        addMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(RoutePath.Integrations);
            },
        });
    };

    const getIntegrationsForm = () => {
        switch (integration.type) {
            case IntegrationType.DISCORD_WEBHOOK:
                return (
                    <IntegrationConfigForm
                        showDescription={true}
                        type={IntegrationType.DISCORD_WEBHOOK}
                        value={integration.value}
                        onChange={(value) => setIntegration({ ...integration, value: value })}
                    />
                );
            case IntegrationType.TWITTER_BOT:
                return (
                    <IntegrationConfigForm
                        showDescription={true}
                        type={IntegrationType.TWITTER_BOT}
                        value={integration.value}
                        onChange={(value) => setIntegration({ ...integration, value: value })}
                    />
                );
            case IntegrationType.WEBHOOK:
                return (
                    <IntegrationConfigForm
                        showDescription={true}
                        type={IntegrationType.WEBHOOK}
                        value={integration.value}
                        onChange={(value) => setIntegration({ ...integration, value: value })}
                    />
                );
        }
    };

    const getConfigIcon = () => {
        switch (integration.type) {
            case IntegrationType.DISCORD_WEBHOOK:
                return <DiscordIcon />;
            case IntegrationType.TWITTER_BOT:
                return <TwitterIcon />;
            default:
                return <SettingsOutlinedIcon />;
        }
    };

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <Card
                sx={{
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 16px 8px 16px',
                    marginTop: isMobile ? '0px' : '16px',
                }}
            >
                <IntegrationConfigMetadataSection
                    value={integration}
                    callbacks={{
                        onChange: setIntegration,
                        resetIntegrationIdError: () => setIdError(''),
                    }}
                    idError={idError || idValidationError}
                />
                <IntegrationHeaderBox sx={{ marginBottom: 0 }}>
                    {getConfigIcon()}
                    <IntegrationHeaderText>Configuration</IntegrationHeaderText>
                </IntegrationHeaderBox>
                {getIntegrationsForm()}
                <Box sx={{ display: 'flex', margin: '8px' }}>
                    <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.Integrations)}>
                        Cancel
                    </TertiaryButton>
                    <Typography sx={{ flexGrow: 1 }} />
                    <PrimaryButton
                        disabled={saveDisabled}
                        disableOnNoAuth={true}
                        loading={addMutation.isLoading}
                        loadingPosition={'start'}
                        icon={SaveIcon}
                        onClick={() => onAdd()}
                    >
                        Save
                    </PrimaryButton>
                </Box>
            </Card>
        </Grid>
    );
};
