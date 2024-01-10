import { DiscordWebhook, discordWebhookConstraints } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';

type Props = {
    value: DiscordWebhook;
    onChange: (value: DiscordWebhook) => void;
};

export const DiscordWebhookEditForm = ({ value, onChange }: Props) => {
    const [showSecret, setShowSecret] = useState(false);

    const webhook = value.webhook;

    return (
        <Box sx={{ margin: '12px 8px' }}>
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
                showSecret={showSecret}
                setShowSecret={setShowSecret}
                required
            />
        </Box>
    );
};
