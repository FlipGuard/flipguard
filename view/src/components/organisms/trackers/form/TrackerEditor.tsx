import { NftEventType } from '@flipguard/domain';
import {
    ActionType,
    BotModelContraints,
    BotWizardCondition,
    DiscordWebhookWizardAction,
    getIntegrationIdFromAction,
    getIntegrationTypeForWizardAction,
    getMessageTemplateIdFromAction,
    getMessageTemplateTypeForIntegrationType,
    IntegrationType,
    MessageTemplateType,
    Permission,
    TrackerBotWizardConfigModel,
    TwitterTweetWizardAction,
    WebhookWizardAction,
} from '@flipguard/webapp-api';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import { Box, Grid } from '@mui/material';
import { ethers } from 'ethers';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { RoutePath } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { useCollectionName } from '../../../../hooks/use-collection-name';
import { WarningAlert } from '../../../atoms/feedback/alert/WarningAlert';
import { CustomRadioGroup } from '../../../atoms/inputs/radio-group/CustomRadioGroup';
import { CustomTextField } from '../../../atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../../atoms/navigation/CustomLink';
import { HeaderBox } from '../../../atoms/utils/HeaderBox';
import { HeaderText } from '../../../atoms/utils/HeaderText';
import { ConditionAddButton } from '../../bot-config-editor/conditions/ConditionAddButton';
import { ConditionAddDialog } from '../../bot-config-editor/conditions/dialog/ConditionAddDialog';
import { WizardBotCondition } from '../../bot-config-editor/conditions/WizardBotCondition';
import { TrackerIntegrationSelect } from './TrackerIntegrationSelect';
import { TrackerMessagePreview } from './TrackerMessagePreview';
import { TrackerMessageTemplateSelect } from './TrackerMessageTemplateSelect';

const DEFAULT_DISCORD_WEBHOOK_ACTION: DiscordWebhookWizardAction = {
    type: ActionType.DISCORD_WEBHOOK.fluffName,
    integration: '',
    template: '',
};

const DEFAULT_TWITTER_TWEET_ACTION: TwitterTweetWizardAction = {
    type: ActionType.TWITTER_TWEET.fluffName,
    integration: '',
    template: '',
};

const DEFAULT_WEBHOOK_SEND_ACTION: WebhookWizardAction = {
    type: ActionType.WEBHOOK_SEND.fluffName,
    webhookId: '',
};

type Props = {
    eventType: NftEventType;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    wizardBotConfig: TrackerBotWizardConfigModel;
    setWizardBotConfig: Dispatch<SetStateAction<TrackerBotWizardConfigModel>>;
    useDefaultIntegrations: boolean;
};

export const TrackerEditor = ({
    eventType,
    name,
    setName,
    wizardBotConfig,
    setWizardBotConfig,
    useDefaultIntegrations,
}: Props) => {
    const { user } = useAuth();

    const [conditionAddDialogOpen, setConditionAddDialogOpen] = useState(false);
    const collectionName = useCollectionName(wizardBotConfig.collection);

    const onConditionAdd = (condition: BotWizardCondition) => {
        setWizardBotConfig((prev) => ({
            ...prev,
            conditions: [
                ...prev.conditions,
                {
                    ...condition,
                    values: condition.values.filter((v) => v !== ''),
                },
            ],
        }));
    };

    const action = wizardBotConfig.action;

    const getDefaultIntegration = (type: IntegrationType) => user.usedIntegrationIds(type)[0] ?? '';
    const getDefaultTemplate = (type: MessageTemplateType) => user.usedMessageTemplatesIds(type, eventType)[0] ?? '';

    const onActionTypeChange = (newType: string) => {
        switch (newType) {
            case ActionType.DISCORD_WEBHOOK.fluffName:
                setWizardBotConfig((prev) => ({
                    ...prev,
                    action: {
                        ...DEFAULT_DISCORD_WEBHOOK_ACTION,
                        integration: getDefaultIntegration(IntegrationType.DISCORD_WEBHOOK),
                        template: getDefaultTemplate(MessageTemplateType.DISCORD_EMBED),
                    },
                }));
                break;
            case ActionType.TWITTER_TWEET.fluffName:
                setWizardBotConfig((prev) => ({
                    ...prev,
                    action: {
                        ...DEFAULT_TWITTER_TWEET_ACTION,
                        integration: getDefaultIntegration(IntegrationType.TWITTER_BOT),
                        template: getDefaultTemplate(MessageTemplateType.TWITTER_TWEET),
                    },
                }));
                break;
            case ActionType.WEBHOOK_SEND.fluffName:
                setWizardBotConfig((prev) => ({
                    ...prev,
                    action: {
                        ...DEFAULT_WEBHOOK_SEND_ACTION,
                        webhookId: getDefaultIntegration(IntegrationType.WEBHOOK),
                    },
                }));
                break;
        }
    };

    const onActionIntegrationChange = (integrationId: string) => {
        setWizardBotConfig((prev) => {
            const action = prev.action;

            switch (action.type) {
                case ActionType.DISCORD_WEBHOOK.fluffName:
                    return {
                        ...prev,
                        action: { ...action, integration: integrationId },
                    };
                case ActionType.TWITTER_TWEET.fluffName:
                    return {
                        ...prev,
                        action: { ...action, integration: integrationId },
                    };
                case ActionType.WEBHOOK_SEND.fluffName:
                    return {
                        ...prev,
                        action: { ...action, webhookId: integrationId },
                    };
            }

            return prev;
        });
    };

    const onActionMessageTemplateChange = (templateId: string) => {
        setWizardBotConfig((prev) => {
            const action = prev.action;

            switch (action.type) {
                case ActionType.DISCORD_WEBHOOK.fluffName:
                    return {
                        ...prev,
                        action: { ...action, template: templateId },
                    };
                case ActionType.TWITTER_TWEET.fluffName:
                    return {
                        ...prev,
                        action: { ...action, template: templateId },
                    };
            }

            return prev;
        });
    };

    useEffect(() => {
        if (useDefaultIntegrations) {
            onActionTypeChange(action.type);
        }
    }, []);

    const canConditionsBeAdded = wizardBotConfig.conditions.length < 9;

    const requiredIntegration = getIntegrationTypeForWizardAction(action.type) as IntegrationType;
    const requiredMessageTemplate = getMessageTemplateTypeForIntegrationType(requiredIntegration);

    const availableIntegrationsCount = user.usedIntegrationIds(requiredIntegration).length;
    const chosenIntegrationId = getIntegrationIdFromAction(action) as string;
    const chosenMessageTemplateId = getMessageTemplateIdFromAction(action) as string;

    const isAddressValid = wizardBotConfig.collection === '' || ethers.utils.isAddress(wizardBotConfig.collection);

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        margin: '8px',
                        marginTop: '12px',
                    }}
                >
                    <CustomTextField
                        name={'Bot Name'}
                        label={'Bot Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{ maxLength: BotModelContraints.name.max }}
                        required
                    />
                    <CustomTextField
                        sx={{ marginTop: '12px' }}
                        name={'Contract Address'}
                        label={'Contract Address'}
                        placeholder={'0x09421f533497331e1075fdca2a16e9ce3f52312b'}
                        value={wizardBotConfig.collection}
                        onChange={(e) =>
                            setWizardBotConfig({
                                ...wizardBotConfig,
                                collection: e.target.value,
                            })
                        }
                        required
                        inputProps={{ maxLength: 64 }}
                        helperText={
                            isAddressValid ? `Collection name: ${collectionName ?? '?'}` : 'Invalid contract address'
                        }
                        error={!isAddressValid}
                    />
                </Box>
                <HeaderBox>
                    <FilterAltOutlinedIcon />
                    <HeaderText>Filter</HeaderText>
                </HeaderBox>
                <Box sx={{ margin: '8px', marginTop: '-12px', display: 'flex', flexWrap: 'wrap' }}>
                    {wizardBotConfig.conditions.map((condition, idx) => (
                        <WizardBotCondition
                            key={idx}
                            condition={condition}
                            remove={() =>
                                setWizardBotConfig((prev) => {
                                    const left = prev.conditions.slice(0, idx);
                                    const right = prev.conditions.slice(idx + 1);
                                    return { ...prev, conditions: [...left, ...right] };
                                })
                            }
                        />
                    ))}
                    {canConditionsBeAdded && (
                        <ConditionAddButton
                            sx={{ marginTop: '12px', marginBottom: 0 }}
                            onClick={() => setConditionAddDialogOpen(true)}
                        />
                    )}
                </Box>
                <HeaderBox sx={{ marginTop: '24px' }}>
                    <WebhookOutlinedIcon />
                    <HeaderText>Service</HeaderText>
                </HeaderBox>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        margin: '8px',
                        marginTop: '12px',
                    }}
                >
                    <CustomRadioGroup
                        sx={{ marginTop: '-4px' }}
                        radios={[
                            { value: ActionType.DISCORD_WEBHOOK.fluffName, label: 'Discord' },
                            { value: ActionType.TWITTER_TWEET.fluffName, label: 'Twitter' },
                            {
                                value: ActionType.WEBHOOK_SEND.fluffName,
                                label: 'My own application',
                                disabled: !user.hasOneOfPermissions(Permission.ADMIN, Permission.DEVELOPER),
                                disabledReason: 'Requires an active developer module',
                            },
                        ]}
                        onChange={(v) => onActionTypeChange(v as IntegrationType)}
                        value={action.type}
                        row
                    />
                </Box>
            </Box>
            <Grid container spacing={5} sx={{ marginTop: 0 }}>
                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ paddingTop: '0 !important' }}>
                    <HeaderBox>
                        <SettingsOutlinedIcon />
                        <HeaderText>Service configuration</HeaderText>
                    </HeaderBox>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {availableIntegrationsCount > 0 ? (
                            <TrackerIntegrationSelect
                                sx={{ flexGrow: 1, margin: '8px' }}
                                type={requiredIntegration}
                                value={chosenIntegrationId}
                                onChange={(e) => onActionIntegrationChange(e.target.value)}
                            />
                        ) : (
                            <Box sx={{ margin: '8px' }}>
                                <WarningAlert sx={{ marginBottom: '8px' }}>
                                    {'You have not created any integrations for this service yet'}
                                </WarningAlert>
                                <CustomLink href={RoutePath.Integrations}>
                                    Click here to create an integration
                                </CustomLink>
                            </Box>
                        )}
                        {requiredMessageTemplate && (
                            <TrackerMessageTemplateSelect
                                sx={{ flexGrow: 1, margin: '8px' }}
                                eventType={eventType}
                                type={requiredMessageTemplate}
                                value={chosenMessageTemplateId}
                                onChange={(e) => onActionMessageTemplateChange(e.target.value)}
                            />
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ paddingTop: '0 !important' }}>
                    <HeaderBox>
                        <DesignServicesOutlinedIcon />
                        <HeaderText>Preview</HeaderText>
                    </HeaderBox>
                    <TrackerMessagePreview
                        eventType={eventType}
                        integrationType={requiredIntegration}
                        messageTemplateType={requiredMessageTemplate}
                        messageTemplateId={chosenMessageTemplateId}
                        onGenerateSuccess={onActionMessageTemplateChange}
                    />
                </Grid>
            </Grid>
            <ConditionAddDialog
                open={conditionAddDialogOpen}
                onClose={() => setConditionAddDialogOpen(false)}
                trigger={eventType}
                addCondition={onConditionAdd}
            />
        </>
    );
};
