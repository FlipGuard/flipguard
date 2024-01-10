import { NftEventType } from '@flipguard/domain';
import {
    BotConfigType,
    BotGetDto,
    BotWizardConfigModel,
    BotWizardConfigType,
    getIntegrationIdFromAction,
    getIntegrationTypeForWizardAction,
    getMessageTemplateIdFromAction,
    getMessageTemplateTypeForIntegrationType,
    IntegrationType,
} from '@flipguard/webapp-api';

import { UserDetailsWrapper } from '../hooks/utils/user-details-wrapper';

export const isListingTracker = (bot: BotGetDto) => {
    return (
        bot.configType === BotConfigType.WIZARD &&
        bot.trigger === NftEventType.Listing &&
        bot.wizardConfig?.type === BotWizardConfigType.TRACKER
    );
};

export const isSaleTracker = (bot: BotGetDto) => {
    return (
        bot.configType === BotConfigType.WIZARD &&
        bot.trigger === NftEventType.Sale &&
        bot.wizardConfig?.type === BotWizardConfigType.TRACKER
    );
};

export const isSnipingBot = (bot: BotGetDto) => {
    return (
        bot.configType === BotConfigType.WIZARD &&
        bot.trigger === NftEventType.Listing &&
        bot.wizardConfig?.type === BotWizardConfigType.SNIPING_BOT_SINGLE_COLLECTION
    );
};

export const isCustomBot = (bot: BotGetDto) => {
    return bot.configType === BotConfigType.FLUFF;
};

export const isBotInBrokenState = (bot: BotGetDto, user: UserDetailsWrapper) => {
    if (bot.configType === BotConfigType.FLUFF) {
        return false;
    }

    const config = bot.wizardConfig as BotWizardConfigModel;
    const action = config.action;

    const integrationType = getIntegrationTypeForWizardAction(action.type) as IntegrationType;
    const integrationId = getIntegrationIdFromAction(action);
    const integrationExists = user.usedIntegrationIds(integrationType).includes(integrationId ?? '');
    if (!integrationExists) {
        return true;
    }

    const messageTemplateType = getMessageTemplateTypeForIntegrationType(integrationType);
    if (!messageTemplateType) {
        return false;
    }

    const messageTemplateId = getMessageTemplateIdFromAction(action);
    return !user.usedMessageTemplatesIds(messageTemplateType, bot.trigger).includes(messageTemplateId ?? '');
};
