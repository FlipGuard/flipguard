import { NftEventType } from '@flipguard/domain';
import {
    ActionType,
    BotConfigType,
    BotCreateDto,
    BotWizardConfigType,
    IntegrationType,
    Permission,
    SnipingSingleCollectionBotWizardConfigModel,
} from '@flipguard/webapp-api';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import { useBotCreateMutation } from '../../api/mutations/tracking-bots';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { SingleCollectionSnipingBotEditor } from '../../components/organisms/sniping-bot/form/SingleCollectionSnipingBotEditor';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';

const INITIAL_WIZARD_BOT_CONFIG: SnipingSingleCollectionBotWizardConfigModel = {
    type: BotWizardConfigType.SNIPING_BOT_SINGLE_COLLECTION,
    chain: 'Polygon',
    marketplaces: [],
    collection: '',
    conditions: [],
    action: {
        type: ActionType.AUTOBUY.fluffName,
        burner: '',
        gasMultiplier: 2,
    },
};

export const SnipingBotsCreate = () => {
    const { user } = useAuth();
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const createBotMutation = useBotCreateMutation();

    const [name, setName] = useState('');
    const [wizardBotConfig, setWizardBotConfig] =
        useState<SnipingSingleCollectionBotWizardConfigModel>(INITIAL_WIZARD_BOT_CONFIG);

    useEffect(() => {
        const burners = user.usedIntegrationIds(IntegrationType.BURNER_WALLET);
        if (burners.length > 0) {
            setWizardBotConfig((prev) => ({ ...prev, action: { ...prev.action, burner: burners[0] } }));
        }
    }, []);

    const onSave = () => {
        const dto: BotCreateDto = {
            trigger: NftEventType.Listing,
            configType: BotConfigType.WIZARD,
            name: name,
            description: '',
            wizardConfig: wizardBotConfig,
        };

        createBotMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(RoutePath.SnipingBots);
            },
        });
    };

    const action = wizardBotConfig.action;
    const conditionsAdded = wizardBotConfig.conditions.length > 0;

    const hasAccess = user.hasOneOfPermissions(Permission.ADMIN, Permission.SNIPING);
    const saveDisabled =
        name === '' ||
        !wizardBotConfig.collection ||
        !action.burner ||
        !ethers.utils.isAddress(wizardBotConfig.collection) ||
        !conditionsAdded ||
        (!!action.transferTo && !ethers.utils.isAddress(action.transferTo ?? '')) ||
        !hasAccess;

    const getTooltipMessage = () => {
        if (!conditionsAdded) {
            return 'You have not set any conditons for your bot';
        }

        return !hasAccess ? 'You need an active sniping module to create sniping bots' : undefined;
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
            <HeaderBox sx={{ marginTop: 0, marginBottom: 0 }}>
                <GamesOutlinedIcon />
                <HeaderText>Create Sniping Bot</HeaderText>
                <Typography sx={{ flexGrow: 1 }} />
                <FadingTooltip title={'Open sniping bots setup guide'} placement={'top'}>
                    <HelpOutlineIcon
                        onClick={() =>
                            window.open(
                                'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/sniping-bots',
                                '_blank',
                            )
                        }
                        sx={{ color: '#81807f', '&:hover': { color: '#fff', cursor: 'pointer' } }}
                    />
                </FadingTooltip>
            </HeaderBox>
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
                    loading={createBotMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onSave}
                    tooltipMessage={getTooltipMessage()}
                >
                    Create Bot
                </PrimaryButton>
            </Box>
        </Card>
    );
};
