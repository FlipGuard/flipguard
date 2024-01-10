import {
    FlipBotGlobalFlippingConfig,
    FlipBotGlobalFlippingConfigUpdateDto,
    FlippingContest,
} from '@flipguard/webapp-api';
import React from 'react';

import { useGlobalFlippingSettingsUpdateMutation } from '../../../../api/mutations/flipbot-global-config';
import { displaySuccessToast } from '../../../../utils/toasts';
import { FlippingContestEditor } from '../../../flipbot/modules/flipping/components/FlippingContestEditor';

type Props = {
    settings: FlipBotGlobalFlippingConfig;
};

export const AdminPanelFlippingGlobalEventCard = ({ settings }: Props) => {
    const updateMutation = useGlobalFlippingSettingsUpdateMutation();

    const onSave = (contest: FlippingContest) => {
        const dto: FlipBotGlobalFlippingConfigUpdateDto = {
            ...settings,
            contest: contest,
        };

        updateMutation.mutate(dto, {
            onSuccess: () => {
                displaySuccessToast('Global flipping event has been updated');
            },
        });
    };

    return (
        <FlippingContestEditor contest={settings.contest} onSave={onSave} isSaveLoading={updateMutation.isLoading} />
    );
};
