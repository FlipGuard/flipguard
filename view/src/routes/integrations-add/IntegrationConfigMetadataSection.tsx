import { Integration, integrationConstraints, IntegrationType, Permission } from '@flipguard/webapp-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import { Box } from '@mui/material';
import React from 'react';

import { CustomRadioGroup } from '../../components/atoms/inputs/radio-group/CustomRadioGroup';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { useAuth } from '../../hooks/use-auth';
import { IntegrationHeaderBox, IntegrationHeaderText } from '../integrations/utils/IntegrationUtils';

type Callbacks = {
    onChange: (value: Integration) => void;
    resetIntegrationIdError?: () => void;
};

type Props = {
    creationDisabled?: boolean;
    value: Integration;
    callbacks: Callbacks;
    idError?: string;
};

export const IntegrationConfigMetadataSection = (props: Props) => {
    const { user } = useAuth();

    const { value: currentValue, idError = '', creationDisabled = false } = props;
    const { onChange, resetIntegrationIdError } = props.callbacks;

    const onTypeChange = (type: IntegrationType) => {
        if (type !== currentValue.type) {
            if (type === IntegrationType.DISCORD_WEBHOOK) {
                onChange({
                    ...currentValue,
                    type,
                    value: {
                        webhook: '',
                    },
                });
            } else if (type === IntegrationType.TWITTER_BOT) {
                onChange({
                    ...currentValue,
                    type,
                    value: {
                        apiKey: '',
                        apiSecret: '',
                        accessTokenKey: '',
                        accessTokenSecret: '',
                    },
                });
            } else if (type === IntegrationType.WEBHOOK) {
                onChange({
                    ...currentValue,
                    type,
                    value: {
                        url: '',
                        headers: [],
                    },
                });
            }
        }
    };

    return (
        <Box>
            <IntegrationHeaderBox sx={{ marginTop: 0 }}>
                <AssignmentOutlinedIcon />
                <IntegrationHeaderText>Add Integration</IntegrationHeaderText>
            </IntegrationHeaderBox>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    margin: '8px',
                    marginTop: '12px',
                }}
            >
                <CustomTextField
                    sx={{ width: '100%' }}
                    name={'Integration ID'}
                    label={'Integration Name'}
                    value={currentValue.id}
                    onChange={(e) => {
                        onChange({ ...currentValue, id: e.target.value });
                        if (idError !== '' && resetIntegrationIdError) {
                            resetIntegrationIdError();
                        }
                    }}
                    inputProps={{ maxLength: integrationConstraints.id.max }}
                    error={idError !== ''}
                    helperText={idError}
                    required
                    disabled={creationDisabled}
                />
            </Box>
            <IntegrationHeaderBox sx={{ marginTop: '24px' }}>
                <WebhookOutlinedIcon />
                <IntegrationHeaderText>Service</IntegrationHeaderText>
            </IntegrationHeaderBox>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '8px',
                    marginTop: '12px',
                }}
            >
                <CustomRadioGroup
                    sx={{ marginTop: '-4px' }}
                    radios={[
                        { value: IntegrationType.DISCORD_WEBHOOK, label: 'Discord' },
                        { value: IntegrationType.TWITTER_BOT, label: 'Twitter' },
                        {
                            value: IntegrationType.WEBHOOK,
                            label: 'My own application',
                            disabled: !user.hasOneOfPermissions(Permission.ADMIN, Permission.DEVELOPER),
                            disabledReason: 'Requires an active developer module',
                        },
                    ]}
                    onChange={(v) => onTypeChange(v as IntegrationType)}
                    value={currentValue.type}
                    row
                />
            </Box>
        </Box>
    );
};
