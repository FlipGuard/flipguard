import { NftEventType } from '@flipguard/domain';
import { IntegrationType, MessageTemplateCreateDto, MessageTemplateType } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { useMessageTemplateAddMutation } from '../../../../api/mutations/message-templates';
import { getMessageTemplate, MessageTemplateQueryKeys } from '../../../../api/requests/message-templates';
import { RoutePath } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { WarningAlert } from '../../../atoms/feedback/alert/WarningAlert';
import { PrimaryButton } from '../../../atoms/inputs/button/PrimaryButton';
import { CustomLink } from '../../../atoms/navigation/CustomLink';
import { DelayedCircularProgress } from '../../../layout/utils/DelayedCircularProgress';
import { DiscordEmbedPreview } from '../../message-templates-editor/discord-embed-preview/DiscordEmbedPreview';
import { getPresetFor } from '../../message-templates-editor/presets/template-presets';
import { TwitterPostPreview } from '../../message-templates-editor/twitter-post-preview/TwitterPostPreview';

const INTEGRATIONS_WITH_TEMPLATES = [IntegrationType.DISCORD_WEBHOOK, IntegrationType.TWITTER_BOT];

type Props = {
    eventType: NftEventType;
    integrationType: IntegrationType;
    messageTemplateType?: MessageTemplateType;
    messageTemplateId: string;
    onGenerateSuccess: (templateId: string) => void;
};

export const TrackerMessagePreview = ({
    eventType,
    integrationType,
    messageTemplateType,
    messageTemplateId,
    onGenerateSuccess,
}: Props) => {
    const { authenticated } = useAuth();
    const messageTemplateExist = messageTemplateId !== '';
    const integrationHasTemplate = INTEGRATIONS_WITH_TEMPLATES.includes(integrationType);

    const { isLoading, data: template } = useQuery(
        MessageTemplateQueryKeys.detail(messageTemplateId),
        () => getMessageTemplate(messageTemplateId),
        {
            enabled: authenticated && integrationHasTemplate && messageTemplateExist,
        },
    );

    if (!authenticated) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', color: '#999' }}>
                You have to sign in first
            </Box>
        );
    }

    if (!integrationHasTemplate || !messageTemplateType) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', color: '#999' }}>
                Not available for this service
            </Box>
        );
    }

    if (messageTemplateExist && isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        );
    }

    if (!template) {
        return (
            <GenerateDefaultTemplateBox
                eventType={eventType}
                messageTemplateType={messageTemplateType}
                onGenerateSuccess={onGenerateSuccess}
            />
        );
    }

    const { messageType, value } = template;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ padding: '8px', maxWidth: '500px' }}>
                {messageType === MessageTemplateType.DISCORD_EMBED ? (
                    <DiscordEmbedPreview template={value} asMessage={true} />
                ) : (
                    <TwitterPostPreview template={value} />
                )}
            </Box>
        </Box>
    );
};

type GenerateDefaultTemplateBoxProps = {
    eventType: NftEventType;
    messageTemplateType: MessageTemplateType;
    onGenerateSuccess: (templateId: string) => void;
};

const GenerateDefaultTemplateBox = ({
    eventType,
    messageTemplateType,
    onGenerateSuccess,
}: GenerateDefaultTemplateBoxProps) => {
    const addMessageTemplateMutation = useMessageTemplateAddMutation();

    const onGenerate = () => {
        const service = messageTemplateType === MessageTemplateType.DISCORD_EMBED ? 'Discord' : 'Twitter';
        const templateId = `Default ${service} ${eventType.toLowerCase()}`;

        const dto: MessageTemplateCreateDto = {
            id: templateId,
            description: '',
            eventType: eventType,
            messageType: messageTemplateType,
            value: getPresetFor(eventType, messageTemplateType),
        } as MessageTemplateCreateDto;

        addMessageTemplateMutation.mutate(dto, {
            onSuccess: () => onGenerateSuccess(templateId),
        });
    };

    return (
        <Box
            sx={{
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                height: '80%',
                '& p': {
                    color: '#999',
                    fontSize: '14px',
                },
                '& a': {
                    fontSize: '14px',
                },
            }}
        >
            <WarningAlert sx={{ marginBottom: '12px', width: '100%' }}>
                {`You don't have any ${eventType.toLowerCase()} message templates created for this service yet`}
            </WarningAlert>
            <Typography>
                <CustomLink href={RoutePath.MessageTemplates} sx={{ marginRight: '4px' }}>
                    Click here to create one
                </CustomLink>
                or generate a default message template by clicking the button below:
            </Typography>
            <PrimaryButton
                sx={{ marginTop: '16px' }}
                disableOnNoAuth={true}
                disabled={addMessageTemplateMutation.isLoading}
                loading={addMessageTemplateMutation.isLoading}
                onClick={onGenerate}
            >
                Generate
            </PrimaryButton>
        </Box>
    );
};
