import { NftEventType } from '@flipguard/domain';
import {
    BotConfigType,
    BotUpdateDto,
    convertTrackerWizardConfigToFluff,
    getIntegrationIdFromAction,
    getIntegrationTypeForWizardAction,
    getMessageTemplateIdFromAction,
    IntegrationType,
    MessageTemplateType,
    TrackerBotWizardConfigModel,
} from '@flipguard/webapp-api';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Divider, Typography } from '@mui/material';
import { ethers } from 'ethers';
import equal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import { useBotUpdateMutation } from '../../../../api/mutations/tracking-bots';
import { RoutePath } from '../../../../config/constants/navigation';
import isViewMobile from '../../../../hooks/utils/isViewMobile';
import { FadingTooltip } from '../../../atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../../atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../../atoms/utils/HeaderBox';
import { HeaderText } from '../../../atoms/utils/HeaderText';
import { InputLikeBox } from '../../../molecules/utils/InputLikeBox';
import { ReadonlyFluffEditorDialog } from '../../fluff-editor-v2/ReadonlyFluffEditorDialog';
import { TrackerEditor } from '../form/TrackerEditor';

type Props = {
    botId: string;
    name: string;
    wizardBotConfig: TrackerBotWizardConfigModel;
    eventType: NftEventType;
    returnPath: RoutePath;
};

export const TrackerEditForm = ({
    botId,
    name: originalName,
    wizardBotConfig: originalWizardBotConfig,
    eventType,
    returnPath,
}: Props) => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const updateBotMutation = useBotUpdateMutation();

    const [showFluffDialog, setShowFluffDialog] = useState(false);

    const [name, setName] = useState(originalName);
    const [wizardBotConfig, setWizardBotConfig] = useState<TrackerBotWizardConfigModel>(originalWizardBotConfig);
    const [code, setCode] = useState<string[]>(convertTrackerWizardConfigToFluff(eventType, originalWizardBotConfig));

    useEffect(() => {
        setCode(convertTrackerWizardConfigToFluff(eventType, wizardBotConfig));
    }, [JSON.stringify(wizardBotConfig)]);

    const getMessageTemplateTypeForIntegrationType = (type: IntegrationType) => {
        switch (type) {
            case IntegrationType.DISCORD_WEBHOOK:
                return MessageTemplateType.DISCORD_EMBED;
            case IntegrationType.TWITTER_BOT:
                return MessageTemplateType.TWITTER_TWEET;
        }
    };

    const onUpdate = () => {
        const dto: BotUpdateDto = {
            configType: BotConfigType.WIZARD,
            name: name,
            wizardConfig: wizardBotConfig,
        };

        updateBotMutation.mutate(
            { botId, dto },
            {
                onSuccess: () => {
                    setLocation(returnPath);
                },
            },
        );
    };

    const action = wizardBotConfig.action;

    const requiredIntegration = getIntegrationTypeForWizardAction(action.type) as IntegrationType;
    const requiredMessageTemplate = getMessageTemplateTypeForIntegrationType(requiredIntegration);

    const chosenIntegrationId = getIntegrationIdFromAction(action) as string;
    const chosenMessageTemplateId = getMessageTemplateIdFromAction(action) as string;

    const updateDisabled =
        name === '' ||
        !wizardBotConfig.collection ||
        !chosenIntegrationId ||
        (requiredMessageTemplate && !chosenMessageTemplateId) ||
        !ethers.utils.isAddress(wizardBotConfig.collection) ||
        (equal(wizardBotConfig, originalWizardBotConfig) && name === originalName);

    const Icon = eventType === NftEventType.Listing ? InfoOutlinedIcon : CircleNotificationsOutlinedIcon;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0 }}>
                <Icon />
                <HeaderText>{`Edit "${originalName}"`}</HeaderText>
                <Typography sx={{ flexGrow: 1 }} />
                <FadingTooltip title={'Show fluff equivalent'} placement={'top'}>
                    <CodeOutlinedIcon
                        onClick={() => setShowFluffDialog(true)}
                        sx={{ color: '#81807f', '&:hover': { color: '#fff', cursor: 'pointer' } }}
                    />
                </FadingTooltip>
            </HeaderBox>
            <InputLikeBox
                label={'Details'}
                sx={{
                    margin: '8px',
                    marginBottom: '2px',
                    padding: '8px 12px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography>ID </Typography>
                    <Typography>{botId.substring(0, 8)}</Typography>
                </Box>
            </InputLikeBox>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#444', margin: '8px', marginTop: '16px' }} />
            <TrackerEditor
                eventType={eventType}
                name={name}
                setName={setName}
                wizardBotConfig={wizardBotConfig}
                setWizardBotConfig={setWizardBotConfig}
                useDefaultIntegrations={false}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.SaleTrackers)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={updateDisabled}
                    disableOnNoAuth={true}
                    loading={updateBotMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onUpdate}
                >
                    Update
                </PrimaryButton>
            </Box>
            <ReadonlyFluffEditorDialog isOpen={showFluffDialog} onClose={() => setShowFluffDialog(false)} code={code} />
        </Card>
    );
};
