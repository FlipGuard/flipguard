import { Webhook } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../../components/atoms/navigation/CustomLink';
import { WebhookHeadersBox } from '../../integrations/components/WebhookHeadersBox';

const LEARN_MORE_LINK = 'https://wiki.flipguard.xyz/flipguard-wiki-wip/utilities/integrations';

const WEBHOOK_DESCRIPTION = `
    You can integrate FlipGuard with your own application using webhooks. 
    They allow your application to get real-time updates about various events as soon as they happen.
`;

type Props = {
    value: Webhook;
    onChange: (value: Webhook) => void;
};

export const WebhookAddForm = ({ value: webhook, onChange }: Props) => {
    return (
        <Box sx={{ margin: '12px 8px' }}>
            <Typography sx={{ marginBottom: '8px', fontSize: '13px', color: '#eee' }}>{WEBHOOK_DESCRIPTION}</Typography>
            <Box sx={{ marginBottom: '8px' }}>
                <CustomLink href={LEARN_MORE_LINK} target={'_blank'} rel={'noreferrer'} sx={{ fontSize: '13px' }}>
                    Learn more about webhooks and event models
                </CustomLink>
            </Box>
            <CustomTextField
                name={'Custom Webhook'}
                label={'Webhook'}
                sx={{
                    width: '100%',
                    marginTop: '6px',
                }}
                placeholder={'https://xxxxxxxxxxxxxxx'}
                value={webhook.url}
                onChange={(e) => onChange({ ...webhook, url: e.target.value })}
                inputProps={{ maxLength: 256 }}
                required
            />
            <WebhookHeadersBox webhook={webhook} onChange={onChange} />
        </Box>
    );
};
