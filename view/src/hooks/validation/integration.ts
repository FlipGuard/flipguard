import { Integration, IntegrationValidateDto, isId } from '@flipguard/webapp-api';
import { useEffect, useState } from 'react';

import { validateIntegration } from '../../api/requests/integrations';
import { useAuth } from '../use-auth';

export const useValidateIntegration = (integrationId: string) => {
    const { user } = useAuth();

    if (!isId(integrationId)) {
        return 'ID can only contain alphanumeric characters, spaces and hyphens';
    }

    if (user.metadata.integrations.find((i) => i.id === integrationId) !== undefined) {
        return 'Integration with this name already exists';
    }

    return '';
};

export const useIntegrationValueValidation = (integration: Integration) => {
    const [error, setError] = useState('');

    useEffect(() => {
        const dto: IntegrationValidateDto = {
            type: integration.type,
            value: integration.value,
        } as IntegrationValidateDto;

        validateIntegration(dto).then((error) => {
            if (error !== '') {
                setError(error);
            }
        });
    }, []);

    return { error };
};
