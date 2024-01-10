import { IntegrationType } from '@flipguard/webapp-api';
import { TextFieldProps } from '@mui/material';
import React from 'react';

import { useAuth } from '../../../../hooks/use-auth';
import { CustomSelect } from '../../../atoms/inputs/select/CustomSelect';

type Props = TextFieldProps & {
    type: IntegrationType;
    value: string;
};

export const TrackerIntegrationSelect = ({ type, value, ...props }: Props) => {
    const { user } = useAuth();

    const availableIntegrations = user.usedIntegrationIds(type);

    const options =
        availableIntegrations.length > 0
            ? availableIntegrations.map((i) => ({ label: i, value: i }))
            : [{ label: 'None*', value: '' }];

    return (
        <CustomSelect
            name={'Integration'}
            label={'Integration'}
            value={availableIntegrations.includes(value) ? value : ''}
            options={options}
            select
            required
            {...props}
        />
    );
};
