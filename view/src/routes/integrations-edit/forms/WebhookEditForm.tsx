import { Webhook } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import { WebhookHeadersBox } from '../../integrations/components/WebhookHeadersBox';

type Props = {
    value: Webhook;
    onChange: (value: Webhook) => void;
};

export const WebhookEditForm = ({ value: webhook, onChange }: Props) => {
    const [showSecret, setShowSecret] = useState(false);

    return (
        <Box sx={{ margin: '12px 8px' }}>
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
                showSecret={showSecret}
                setShowSecret={setShowSecret}
                required
            />
            <WebhookHeadersBox webhook={webhook} onChange={onChange} />
        </Box>
    );
};
