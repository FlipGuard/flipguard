import { FlipBotModuleFlippingSettings, FlipBotModuleFlippingSettingsUpdateDto } from '@flipguard/webapp-api';
import { Box, BoxProps, styled } from '@mui/material';
import React from 'react';

import { useFlippingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { CustomSwitch } from '../../../../../components/atoms/inputs/switch/CustomSwitch';
import { displaySuccessToast } from '../../../../../utils/toasts';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

type Props = BoxProps & {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const GuildFlippingSettingsBox = ({ configId, config, ...props }: Props) => {
    const moduleEnabledMutation = useFlippingModuleSettingsUpdateMutation();

    const onEnabledSave = (enabled: boolean) => {
        const dto: FlipBotModuleFlippingSettingsUpdateDto = {
            enabled: enabled,
        };

        moduleEnabledMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    displaySuccessToast(`Module has been ${enabled ? 'started' : 'stopped'}.`);
                },
            },
        );
    };

    return (
        <Container {...props}>
            <CustomSwitch
                sx={{ margin: '8px -4px 8px 8px', justifyContent: 'space-between' }}
                label={'Module enabled'}
                labelPlacement={'start'}
                checked={moduleEnabledMutation.isLoading ? !config.enabled : config.enabled}
                onChange={onEnabledSave}
                disabled={moduleEnabledMutation.isLoading}
            />
        </Container>
    );
};
