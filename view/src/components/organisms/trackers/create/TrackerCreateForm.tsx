import { NftEventType } from '@flipguard/domain';
import {
    ActionType,
    BotConfigType,
    BotCreateDto,
    BotWizardConfigType,
    getIntegrationIdFromAction,
    getIntegrationTypeForWizardAction,
    getMessageTemplateIdFromAction,
    IntegrationType,
    MessageTemplateType,
    TrackerBotWizardConfigModel,
} from '@flipguard/webapp-api';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotCreateMutation } from '../../../../api/mutations/tracking-bots';
import { RoutePath } from '../../../../config/constants/navigation';
import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { FadingTooltip } from '../../../atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../../atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../../atoms/utils/HeaderBox';
import { HeaderText } from '../../../atoms/utils/HeaderText';
import { TrackerEditor } from '../form/TrackerEditor';

const INITIAL_WIZARD_BOT_CONFIG: TrackerBotWizardConfigModel = {
    type: BotWizardConfigType.TRACKER,
    chain: 'Polygon',
    marketplaces: [],
    collection: '',
    conditions: [],
    action: {
        type: ActionType.DISCORD_WEBHOOK.fluffName,
        integration: '',
        template: '',
    },
};

type Props = {
    eventType: NftEventType;
    returnPath: RoutePath;
};

export const TrackerCreateForm = ({ eventType, returnPath }: Props) => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const createBotMutation = useBotCreateMutation();

    const [name, setName] = useState('');
    const [wizardBotConfig, setWizardBotConfig] = useState<TrackerBotWizardConfigModel>(INITIAL_WIZARD_BOT_CONFIG);

    const getMessageTemplateTypeForIntegrationType = (type: IntegrationType) => {
        switch (type) {
            case IntegrationType.DISCORD_WEBHOOK:
                return MessageTemplateType.DISCORD_EMBED;
            case IntegrationType.TWITTER_BOT:
                return MessageTemplateType.TWITTER_TWEET;
        }
    };

    const onSave = () => {
        const dto: BotCreateDto = {
            trigger: eventType,
            configType: BotConfigType.WIZARD,
            name: name,
            description: '',
            wizardConfig: wizardBotConfig,
        };

        createBotMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(returnPath);
            },
        });
    };

    const action = wizardBotConfig.action;

    const requiredIntegration = getIntegrationTypeForWizardAction(action.type) as IntegrationType;
    const requiredMessageTemplate = getMessageTemplateTypeForIntegrationType(requiredIntegration);

    const chosenIntegrationId = getIntegrationIdFromAction(action) as string;
    const chosenMessageTemplateId = getMessageTemplateIdFromAction(action) as string;

    const saveDisabled =
        name === '' ||
        !wizardBotConfig.collection ||
        !chosenIntegrationId ||
        (requiredMessageTemplate && !chosenMessageTemplateId) ||
        !ethers.utils.isAddress(wizardBotConfig.collection);

    const Icon = eventType === NftEventType.Listing ? InfoOutlinedIcon : CircleNotificationsOutlinedIcon;
    const title = eventType === NftEventType.Listing ? 'Create Listing Tracker' : 'Create Sale Tracker';

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0, marginBottom: 0 }}>
                <Icon />
                <HeaderText>{title}</HeaderText>
                <Typography sx={{ flexGrow: 1 }} />
                <FadingTooltip title={'Open listings/sales trackers setup guide'} placement={'top'}>
                    <HelpOutlineIcon
                        onClick={() =>
                            window.open(
                                'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/listings-sales-trackers',
                                '_blank',
                            )
                        }
                        sx={{ color: '#81807f', '&:hover': { color: '#fff', cursor: 'pointer' } }}
                    />
                </FadingTooltip>
            </HeaderBox>
            <TrackerEditor
                eventType={eventType}
                name={name}
                setName={setName}
                wizardBotConfig={wizardBotConfig}
                setWizardBotConfig={setWizardBotConfig}
                useDefaultIntegrations={true}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(returnPath)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={createBotMutation.isLoading}
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
