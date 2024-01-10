import { NftEventType } from '@flipguard/domain';
import { NFT_EVENT_VARIABLES, NftEventVariable } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React from 'react';

import { InfoAlert } from '../../../atoms/feedback/alert/InfoAlert';
import { CustomAccordion } from '../../../atoms/surfaces/accordion/CustomAccordion';
import { Variable } from './Variable';

type TemplateVariable = NftEventVariable & {
    templateName: string;
};

type Props = {
    eventType: NftEventType;
};

export const AvailableVariables = ({ eventType }: Props) => {
    const variables = getUniqueVariablesFor(eventType);

    return (
        <CustomAccordion label={'Placeholders'}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '8px 0',
                }}
            >
                {variables.map((variable) => (
                    <Variable
                        key={variable.templateName + '_' + eventType}
                        name={variable.templateName ?? ''}
                        description={variable.description}
                        dynamic={variable.dynamic}
                    />
                ))}
            </Box>
            <InfoAlert sx={{ margin: '8px 4px 16px 4px' }}>
                {'Click to copy a placeholder into the clipboard'}
            </InfoAlert>
        </CustomAccordion>
    );
};

const getUniqueVariablesFor = (eventType: NftEventType): NftEventVariable[] => {
    const variables = NFT_EVENT_VARIABLES.filter((v): v is TemplateVariable => isValidVariableFor(v, eventType));
    const sorted = variables.sort((a, b) => a.templateName.localeCompare(b.templateName));
    const byTemplateName = Object.fromEntries(sorted.map((v) => [v.templateName as string, v]));
    return Object.values(byTemplateName);
};

const isValidVariableFor = (v: NftEventVariable, eventType: NftEventType) => {
    const isDefined = v.templateName !== undefined;
    return isDefined && (v.requiredEventTypes === undefined || v.requiredEventTypes.includes(eventType));
};
