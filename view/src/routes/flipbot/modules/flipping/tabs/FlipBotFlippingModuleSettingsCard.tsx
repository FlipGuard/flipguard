import {
    discordWebhookConstraints,
    FlipBotModuleFlippingSettings,
    FlipBotModuleFlippingSettingsUpdateDto,
} from '@flipguard/webapp-api';
import SaveIcon from '@mui/icons-material/Save';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useFlippingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { InfoAlert } from '../../../../../components/atoms/feedback/alert/InfoAlert';
import { PrimaryButton } from '../../../../../components/atoms/inputs/button/PrimaryButton';
import { CustomTextField } from '../../../../../components/atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../../../../components/atoms/navigation/CustomLink';
import { HeaderBox } from '../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../components/atoms/utils/HeaderText';
import { displaySuccessToast } from '../../../../../utils/toasts';

const FLIPPING_FEED_WEBHOOK_DESCRIPTION = `
    Enter Discord webhooks for a channels you want to get notifications on about flips being executed in your server's 
    flipping room.
`;

type Props = {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const FlipBotFlippingModuleSettingsCard = ({ configId, config }: Props) => {
    const updateMutation = useFlippingModuleSettingsUpdateMutation();

    const [flippingWebhook, setFlippingWebhook] = useState(config.flippingFeedWebhook ?? '');
    const [flippingPublicWebhook, setFlippingPublicWebhook] = useState(config.flippingFeedPublicWebhook ?? '');

    const onSave = () => {
        const dto: FlipBotModuleFlippingSettingsUpdateDto = {
            flippingFeedWebhook: flippingWebhook || null,
            flippingFeedPublicWebhook: flippingPublicWebhook || null,
        };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Settings has been updated');
                },
            },
        );
    };

    const saveDisabled =
        flippingWebhook === (config.flippingFeedWebhook ?? '') &&
        flippingPublicWebhook === (config.flippingFeedPublicWebhook ?? '');

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <WebhookOutlinedIcon />
                <HeaderText>Webhooks</HeaderText>
            </HeaderBox>
            <InfoAlert sx={{ margin: '8px' }}>
                {FLIPPING_FEED_WEBHOOK_DESCRIPTION}
                <CustomLink
                    href={'https://wiki.flipguard.xyz/flipguard-wiki-wip/utilities/integrations/discord-webhook'}
                    target={'_blank'}
                    rel={'noreferrer'}
                    sx={{ fontSize: '13px' }}
                >
                    Learn how to create a Discord webhook
                </CustomLink>
            </InfoAlert>
            <CustomTextField
                sx={{ margin: '8px' }}
                label={'Public flipping feed Discord webhook'}
                placeholder={'https://discord.com/api/webhooks/xxxxx/xxxxx'}
                value={flippingPublicWebhook}
                onChange={(e) => setFlippingPublicWebhook(e.target.value)}
                inputProps={{ maxLength: discordWebhookConstraints.webhook.max }}
                helperText={'Public feed will display flipping outcomes only'}
            />
            <CustomTextField
                sx={{ margin: '8px' }}
                label={'Private flipping feed Discord webhook'}
                placeholder={'https://discord.com/api/webhooks/xxxxx/xxxxx'}
                value={flippingWebhook}
                onChange={(e) => setFlippingWebhook(e.target.value)}
                inputProps={{ maxLength: discordWebhookConstraints.webhook.max }}
                helperText={'Private feed will display flipping outcomes and earned house fees'}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
