import { DiscordWebhook, discordWebhookConstraints } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../../components/atoms/navigation/CustomLink';

const LEARN_MORE_WEBHOOKS_LINK = 'https://wiki.flipguard.xyz/flipguard-wiki-wip/utilities/integrations/discord-webhook';

const WEBHOOK_DESCRIPTION = `
    Integration with Discord is done via webhooks.
    Simply paste your Discord webhook below and you are good to go.
`;

type Props = {
    value: DiscordWebhook;
    onChange: (value: DiscordWebhook) => void;
};

export const DiscordWebhookAddForm = ({ value, onChange }: Props) => {
    const webhook = value.webhook;

    return (
        <Box sx={{ margin: '12px 8px' }}>
            <Typography sx={{ marginBottom: '8px', fontSize: '13px', color: '#eee' }}>{WEBHOOK_DESCRIPTION}</Typography>
            <Box sx={{ marginBottom: '8px' }}>
                <CustomLink
                    href={LEARN_MORE_WEBHOOKS_LINK}
                    target={'_blank'}
                    rel={'noreferrer'}
                    sx={{ fontSize: '13px' }}
                >
                    Learn how to create a Discord webhook
                </CustomLink>
            </Box>
            <CustomTextField
                name={'Discord Webhook'}
                label={'Webhook'}
                sx={{
                    width: '100%',
                    marginTop: '6px',
                }}
                placeholder={'https://discord.com/api/webhooks/xxxxx/xxxxx'}
                value={webhook}
                onChange={(e) => onChange({ webhook: e.target.value })}
                inputProps={{ maxLength: discordWebhookConstraints.webhook.max }}
                required
            />
        </Box>
    );
};
