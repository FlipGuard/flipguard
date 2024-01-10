import { NftEventType } from '@flipguard/domain';
import { MessageTemplateType } from '@flipguard/webapp-api';
import { Box } from '@mui/material';
import React from 'react';

import isViewMobile from '../../../hooks/utils/isViewMobile';
import { validateMessageTemplateId } from '../../../hooks/validation/message-template';
import { MessageTemplateEventTypeSelect } from './metadata/MessageTemplateEventTypeSelect';
import { MessageTemplateIdTextField } from './metadata/MessageTemplateIdTextField';
import { MessageTemplateTypeSelect } from './metadata/MessageTemplateTypeSelect';

type Props = {
    templateId: string;
    onTemplateIdChange: (templateId: string) => void;
    eventType: NftEventType;
    onEventTypeChange: (eventType: NftEventType) => void;
    messageType: MessageTemplateType;
    onMessageTypeChange: (messageType: MessageTemplateType) => void;
    disabled: boolean;
};

export const Settings = ({
    templateId,
    onTemplateIdChange,
    eventType,
    onEventTypeChange,
    messageType,
    onMessageTypeChange,
    disabled,
}: Props) => {
    const isMobile = isViewMobile();
    const templateIdError = validateMessageTemplateId(templateId);

    return (
        <Box
            component={'form'}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <MessageTemplateIdTextField
                sx={{
                    margin: '8px',
                    width: isMobile ? 'auto' : '0%',
                    minWidth: '200px',
                    flexGrow: 2,
                }}
                value={templateId}
                onChange={(e) => onTemplateIdChange(e.target.value)}
                required
                disabled={disabled}
                validationError={templateIdError}
            />
            <MessageTemplateTypeSelect
                sx={{
                    margin: '8px',
                    width: isMobile ? 'auto' : '0%',
                    minWidth: '200px',
                    flexGrow: 1,
                }}
                value={messageType}
                onChange={(e) => onMessageTypeChange(e.target.value as MessageTemplateType)}
                required
                disabled={disabled}
            />
            <MessageTemplateEventTypeSelect
                sx={{
                    margin: '8px',
                    width: isMobile ? 'auto' : '0%',
                    minWidth: '200px',
                    flexGrow: 1,
                }}
                value={eventType}
                onChange={(e) => onEventTypeChange(e.target.value as NftEventType)}
                required
                disabled={disabled}
            />
        </Box>
    );
};
