import { NftEventType } from '@flipguard/domain';
import {
    DiscordEmbedMessageTemplate,
    DiscordEmbedTemplate,
    MessageTemplate,
    MessageTemplateCreateDto,
    MessageTemplateType,
    Permission,
} from '@flipguard/webapp-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import SaveIcon from '@mui/icons-material/Save';
import TwitterIcon from '@mui/icons-material/Twitter';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useMessageTemplateAddMutation } from '../../api/mutations/message-templates';
import { DiscordIcon } from '../../components/atoms/data-display/icons/DiscordIcon';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomRadioGroup } from '../../components/atoms/inputs/radio-group/CustomRadioGroup';
import { MessageTemplateEditor } from '../../components/organisms/message-templates-editor/MessageTemplateEditor';
import { MessageTemplateIdTextField } from '../../components/organisms/message-templates-editor/metadata/MessageTemplateIdTextField';
import { getPresetFor } from '../../components/organisms/message-templates-editor/presets/template-presets';
import { AvailableVariables } from '../../components/organisms/message-templates-editor/variables/AvailableVariables';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { validateMessageTemplateId } from '../../hooks/validation/message-template';
import { MessageTemplateHeaderBox, MessageTemplateHeaderText } from '../message-templates/utils/MessageTemplateUtils';

const INITIAL_VALUE: DiscordEmbedMessageTemplate = {
    id: '',
    description: '',
    eventType: NftEventType.Listing,
    messageType: MessageTemplateType.DISCORD_EMBED,
    value: getPresetFor(NftEventType.Listing, MessageTemplateType.DISCORD_EMBED) as DiscordEmbedTemplate,
    createdAt: 0,
    updatedAt: 0,
};

export const MessageTemplatesAdd = () => {
    const isMobile = isViewMobile();
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    const createMessageTemplateMutation = useMessageTemplateAddMutation();

    const [template, setTemplate] = useState<MessageTemplate>(INITIAL_VALUE);

    const onSave = () => {
        const dto: MessageTemplateCreateDto = {
            id: template.id,
            description: template.description,
            eventType: template.eventType,
            messageType: template.messageType,
            value: template.value,
        } as MessageTemplateCreateDto;

        createMessageTemplateMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(RoutePath.MessageTemplates);
            },
        });
    };

    const templateIdError = validateMessageTemplateId(template.id);

    const ServiceIcon = template.messageType === MessageTemplateType.DISCORD_EMBED ? DiscordIcon : TwitterIcon;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <MessageTemplateHeaderBox sx={{ marginTop: 0 }}>
                <AssignmentOutlinedIcon />
                <MessageTemplateHeaderText>Create Message Template</MessageTemplateHeaderText>
            </MessageTemplateHeaderBox>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    margin: '4px 8px 0 4px',
                }}
            >
                <MessageTemplateIdTextField
                    value={template.id}
                    onChange={(e) => setTemplate((prev) => ({ ...prev, id: e.target.value }))}
                    required
                    validationError={templateIdError}
                />
            </Box>
            <MessageTemplateHeaderBox>
                <ServiceIcon />
                <MessageTemplateHeaderText>Service</MessageTemplateHeaderText>
            </MessageTemplateHeaderBox>
            <Box sx={{ margin: '0 8px' }}>
                <CustomRadioGroup
                    radios={[
                        { value: MessageTemplateType.DISCORD_EMBED, label: 'Discord' },
                        { value: MessageTemplateType.TWITTER_TWEET, label: 'Twitter' },
                    ]}
                    onChange={(v) => {
                        const type = v as MessageTemplateType;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setTemplate((prev) => ({
                            ...prev,
                            messageType: type,
                            value: getPresetFor(prev.eventType, type),
                        }));
                    }}
                    value={template.messageType}
                    row
                />
            </Box>
            <MessageTemplateHeaderBox>
                <ViewInArOutlinedIcon />
                <MessageTemplateHeaderText>Event</MessageTemplateHeaderText>
            </MessageTemplateHeaderBox>
            <Box sx={{ margin: '0 8px' }}>
                <CustomRadioGroup
                    radios={[
                        { value: NftEventType.Listing, label: 'Listing' },
                        { value: NftEventType.Sale, label: 'Sale' },
                        {
                            value: NftEventType.AutobuySale,
                            label: 'Snipe',
                            disabled: !user.hasPermission(Permission.ADMIN),
                            hideWhenDisabled: true,
                        },
                    ]}
                    onChange={(v) => {
                        const type = v as NftEventType;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setTemplate((prev) => ({
                            ...prev,
                            eventType: type,
                            value: getPresetFor(type, prev.messageType),
                        }));
                    }}
                    value={template.eventType}
                    row
                />
            </Box>
            <MessageTemplateHeaderBox>
                <DesignServicesOutlinedIcon />
                <MessageTemplateHeaderText>Customize</MessageTemplateHeaderText>
            </MessageTemplateHeaderBox>
            <Box sx={{ margin: '4px 8px 0 8px' }}>
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
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.MessageTemplates)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={template.id === '' || templateIdError !== ''}
                    disableOnNoAuth={true}
                    loading={createMessageTemplateMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onSave}
                >
                    Save
                </PrimaryButton>
            </Box>
        </Card>
    );
};
