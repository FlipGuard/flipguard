import {
    FlipBotModuleFlippingSettings,
    FlipBotModuleFlippingSettingsUpdateDto,
    FlippingContest,
} from '@flipguard/webapp-api';
import React from 'react';

import { useFlippingModuleSettingsUpdateMutation } from '../../../../../api/mutations/flipbot-guild-configs';
import { displaySuccessToast } from '../../../../../utils/toasts';
import { FlippingContestEditor } from '../components/FlippingContestEditor';

type Props = {
    configId: string;
    config: FlipBotModuleFlippingSettings;
};

export const FlipBotFlippingModuleEventCard = ({ configId, config }: Props) => {
    const updateMutation = useFlippingModuleSettingsUpdateMutation();

    const onSave = (contest: FlippingContest) => {
        const dto: FlipBotModuleFlippingSettingsUpdateDto = { contest };

        updateMutation.mutate(
            { configId, dto },
            {
                onSuccess: () => {
                    displaySuccessToast('Flipping event has been updated');
                },
            },
        );
    };

    return <FlippingContestEditor contest={config.contest} onSave={onSave} isSaveLoading={updateMutation.isLoading} />;
};
