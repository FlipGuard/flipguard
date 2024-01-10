import { Integration, IntegrationType, IntegrationUpdateDto } from '@flipguard/webapp-api';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useIntegrationUpdateMutation } from '../../api/mutations/integrations';
import { useBotRestartMutation } from '../../api/mutations/tracking-bots';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { IntegrationTypeChip } from '../integrations/chips/IntegrationTypeChips';
import { IntegrationHeaderText } from '../integrations/utils/IntegrationUtils';
import { DiscordWebhookEditForm } from './forms/DiscordWebhookEditForm';
import { TwitterBotEditForm } from './forms/TwitterBotEditForm';
import { WebhookEditForm } from './forms/WebhookEditForm';
import { IntegrationEditDialog } from './IntegrationEditDialog';

type Props = {
    integration: Integration;
};

export const IntegrationsEdit = ({ integration: originalIntegration }: Props) => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();
    const updateMutation = useIntegrationUpdateMutation();
    const restartBotMutation = useBotRestartMutation();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [integration, setIntegration] = useState(originalIntegration);

    const isIntegrationValueChanged = !equal(originalIntegration.value, integration.value);
    const updateDisabled = originalIntegration.description === integration.description && !isIntegrationValueChanged;

    const onUpdate = (botsToRestart: string[]) => {
        const dto: IntegrationUpdateDto = {
            description: integration.description,
            value: integration.value,
        };

        updateMutation.mutate(
            { integrationId: originalIntegration.id, dto: dto },
            {
                onSettled: () => {
                    setDialogOpen(false);
                },
                onSuccess: () => {
                    botsToRestart.forEach((botId) => {
                        restartBotMutation.mutate(botId);
                    });
                },
            },
        );
    };

    const getIntegrationsForm = () => {
        switch (integration.type) {
            case IntegrationType.DISCORD_WEBHOOK:
                return (
                    <DiscordWebhookEditForm
                        value={integration.value}
                        onChange={(value) =>
                            setIntegration({
                                ...integration,
                                value: value,
                            })
                        }
                    />
                );
            case IntegrationType.TWITTER_BOT:
                return (
                    <TwitterBotEditForm
                        value={integration.value}
                        onChange={(value) =>
                            setIntegration({
                                ...integration,
                                value: value,
                            })
                        }
                    />
                );
            case IntegrationType.WEBHOOK:
                return (
                    <WebhookEditForm
                        value={integration.value}
                        onChange={(value) =>
                            setIntegration({
                                ...integration,
                                value: value,
                            })
                        }
                    />
                );
        }
    };

    return (
        <Card
            sx={{
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '8px', marginTop: 0 }}>
                <IntegrationTypeChip type={integration.type} />
                <IntegrationHeaderText sx={{ marginLeft: '12px' }}>{integration.id}</IntegrationHeaderText>
            </Box>
            {getIntegrationsForm()}
            <Box sx={{ display: 'flex', margin: '8px', marginTop: '16px' }}>
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.Integrations)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={updateDisabled || dialogOpen || updateMutation.isLoading}
                    disableOnNoAuth={true}
                    icon={SaveIcon}
                    onClick={() => {
                        if (isIntegrationValueChanged) {
                            setDialogOpen(true);
                        } else {
                            onUpdate([]);
                        }
                    }}
                >
                    Update
                </PrimaryButton>
            </Box>
            <IntegrationEditDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                integrationId={originalIntegration.id}
                onUpdate={onUpdate}
                isUpdateLoading={updateMutation.isLoading}
            />
        </Card>
    );
};
