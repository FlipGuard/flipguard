import { MessageTemplate, MessageTemplateUpdateDto } from '@flipguard/webapp-api';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useMessageTemplateUpdateMutation } from '../../api/mutations/message-templates';
import { useBotRestartMutation } from '../../api/mutations/tracking-bots';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { MessageTemplateEditor } from '../../components/organisms/message-templates-editor/MessageTemplateEditor';
import { AvailableVariables } from '../../components/organisms/message-templates-editor/variables/AvailableVariables';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { EventTypeChip } from '../message-templates/chips/EventTypeChips';
import { MessageTypeChip } from '../message-templates/chips/MessageTypeChips';
import { MessageTemplateHeaderText } from '../message-templates/utils/MessageTemplateUtils';
import { MessageTemplateEditDialog } from './MessageTemplateEditDialog';

type Props = {
    template: MessageTemplate;
};

export const MessageTemplatesEdit = ({ template: originalTemplate }: Props) => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

    const updateMessageTemplateMutation = useMessageTemplateUpdateMutation();
    const restartBotMutation = useBotRestartMutation();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [template, setTemplate] = useState(originalTemplate);

    const onUpdate = (botsToRestart: string[]) => {
        const dto: MessageTemplateUpdateDto = {
            templateValue: template.value,
        };

        updateMessageTemplateMutation.mutate(
            {
                templateId: originalTemplate.id,
                dto: dto,
            },
            {
                onSuccess: () => {
                    setLocation(RoutePath.MessageTemplates);
                    botsToRestart.forEach((botId) => {
                        restartBotMutation.mutate(botId);
                    });
                },
                onSettled: () => {
                    setDialogOpen(false);
                },
            },
        );
    };

    const updateDisabled = equal(originalTemplate.value, template.value);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '8px', marginTop: 0 }}>
                <MessageTypeChip type={originalTemplate.messageType} />
                <EventTypeChip sx={{ marginLeft: '12px' }} type={originalTemplate.eventType} />
                <MessageTemplateHeaderText sx={{ marginLeft: '12px' }}>{originalTemplate.id}</MessageTemplateHeaderText>
            </Box>
            <Box sx={{ margin: '12px 8px 0 8px' }}>
                <AvailableVariables eventType={template.eventType} />
            </Box>
            <MessageTemplateEditor
                type={template.messageType}
                template={template.value}
                onChange={(newValue) => {
                    if (typeof newValue === 'function') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setTemplate((prev) => ({ ...prev, value: newValue(prev.value) }));
                    } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setTemplate((prev) => ({ ...prev, value: newValue }));
                    }
                }}
            />
            <Box sx={{ margin: '8px', marginTop: '16px', display: 'flex' }}>
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.MessageTemplates)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={updateDisabled}
                    disableOnNoAuth={true}
                    loading={dialogOpen}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={() => setDialogOpen(true)}
                >
                    Update
                </PrimaryButton>
            </Box>
            <MessageTemplateEditDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                templateId={originalTemplate.id}
                onUpdate={onUpdate}
                isUpdateLoading={updateMessageTemplateMutation.isLoading}
            />
        </Card>
    );
};
