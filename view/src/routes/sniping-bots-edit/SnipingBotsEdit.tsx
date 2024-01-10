import {
    BotConfigType,
    BotGetDto,
    BotUpdateDto,
    convertSnipingSingleCollectionWizardConfigToFluff,
    IntegrationType,
    Permission,
    SnipingSingleCollectionBotWizardConfigModel,
} from '@flipguard/webapp-api';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Divider, Typography } from '@mui/material';
import { ethers } from 'ethers';
import equal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import { useBotUpdateMutation } from '../../api/mutations/tracking-bots';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { ReadonlyFluffEditorDialog } from '../../components/organisms/fluff-editor-v2/ReadonlyFluffEditorDialog';
import { SingleCollectionSnipingBotEditor } from '../../components/organisms/sniping-bot/form/SingleCollectionSnipingBotEditor';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';

type Props = {
    bot: BotGetDto;
};

export const SnipingBotsEdit = ({ bot }: Props) => {
    const originalConfig = bot.wizardConfig as SnipingSingleCollectionBotWizardConfigModel;
    const { user } = useAuth();
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const updateBotMutation = useBotUpdateMutation();

    const [showFluffDialog, setShowFluffDialog] = useState(false);

    const [name, setName] = useState(bot.name);
    const [wizardBotConfig, setWizardBotConfig] = useState<SnipingSingleCollectionBotWizardConfigModel>(originalConfig);
    const [code, setCode] = useState<string[]>(convertSnipingSingleCollectionWizardConfigToFluff(originalConfig));

    useEffect(() => {
        setCode(convertSnipingSingleCollectionWizardConfigToFluff(wizardBotConfig));
    }, [JSON.stringify(wizardBotConfig)]);

    const onUpdate = () => {
        const dto: BotUpdateDto = {
            configType: BotConfigType.WIZARD,
            name: name,
            wizardConfig: wizardBotConfig,
        };

        updateBotMutation.mutate(
            { botId: bot.id, dto },
            {
                onSuccess: () => {
                    setLocation(RoutePath.SnipingBots);
                },
            },
        );
    };

    const action = wizardBotConfig.action;
    const burnerExists = user.usedIntegrationIds(IntegrationType.BURNER_WALLET).includes(action.burner ?? '');
    const conditionsAdded = wizardBotConfig.conditions.length > 0;

    const hasAccess = user.hasOneOfPermissions(Permission.ADMIN, Permission.SNIPING);
    const saveDisabled =
        name === '' ||
        !wizardBotConfig.collection ||
        !action.burner ||
        !burnerExists ||
        !ethers.utils.isAddress(wizardBotConfig.collection) ||
        !conditionsAdded ||
        (!!action.transferTo && !ethers.utils.isAddress(action.transferTo ?? '')) ||
        equal(wizardBotConfig, bot.wizardConfig) ||
        !hasAccess;

    const getTooltipMessage = () => {
        if (!conditionsAdded) {
            return 'You have not set any conditons for your bot';
        }

        return !hasAccess ? 'You need an active sniping module to manage sniping bots' : undefined;
    };

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
                <GamesOutlinedIcon />
                <HeaderText>{`Edit "${bot.name}"`}</HeaderText>
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
                    <Typography>{bot.id.substring(0, 8)}</Typography>
                </Box>
            </InputLikeBox>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#444', margin: '8px', marginTop: '16px' }} />
            <SingleCollectionSnipingBotEditor
                name={name}
                setName={setName}
                wizardBotConfig={wizardBotConfig}
                setWizardBotConfig={setWizardBotConfig}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.SnipingBots)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={updateBotMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onUpdate}
                    tooltipMessage={getTooltipMessage()}
                >
                    Update Bot
                </PrimaryButton>
            </Box>
            <ReadonlyFluffEditorDialog isOpen={showFluffDialog} onClose={() => setShowFluffDialog(false)} code={code} />
        </Card>
    );
};
