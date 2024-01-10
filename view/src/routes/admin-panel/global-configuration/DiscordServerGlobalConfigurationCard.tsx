import { WebappCustomGlobalConfiguration } from '@flipguard/webapp-api';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Card, Divider, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';

import { useUpdateCustomGlobalConfiguration } from '../../../api/mutations/global-configuration';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';
import isViewMobile from '../../../hooks/utils/isViewMobile';

type Props = {
    config: WebappCustomGlobalConfiguration;
};

export const DiscordServerGlobalConfigurationCard = ({ config: originalConfig }: Props) => {
    const isMobile = isViewMobile();

    const updateMutation = useUpdateCustomGlobalConfiguration();

    const [customConfig, setCustomConfig] = useState(originalConfig);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const addConfigEntry = () => {
        setCustomConfig((prev) => ({ ...prev, [key]: value }));
        setKey('');
        setValue('');
    };

    const onSave = () => {
        updateMutation.mutate(customConfig);
    };

    const saveDisabled = equal(customConfig, originalConfig);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '8px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Typography sx={{ margin: '8px' }} variant={'h6'}>
                Custom Settings
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px', margin: '8px' }}>
                <CustomTextField
                    sx={{ flexGrow: 1 }}
                    label={'Key'}
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <CustomTextField
                    sx={{ flexGrow: 1 }}
                    label={'Value'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <TertiaryButton disabled={Object.keys(customConfig).includes(key)} onClick={addConfigEntry}>
                    Add
                </TertiaryButton>
            </Box>
            <Divider sx={{ margin: '16px 8px', borderStyle: 'dashed' }} />
            {Object.keys(customConfig)
                .sort((a, b) => a.localeCompare(b))
                .map((configKey, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: '8px', margin: '8px' }}>
                        <CustomTextField sx={{ flexGrow: 1 }} disabled={true} label={'Key'} value={configKey} />
                        <CustomTextField
                            sx={{ flexGrow: 0.3 }}
                            disabled={true}
                            label={'Value'}
                            value={customConfig[configKey]}
                        />
                        <TertiaryButton
                            onClick={() =>
                                setCustomConfig((prev) => {
                                    const newConfig = { ...prev };
                                    delete newConfig[configKey];
                                    return newConfig;
                                })
                            }
                        >
                            Remove
                        </TertiaryButton>
                    </Box>
                ))}
            <Divider sx={{ margin: '16px 8px', borderStyle: 'dashed' }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PrimaryButton
                    sx={{ margin: '8px' }}
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={updateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveOutlinedIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
