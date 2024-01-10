import {
    BotConfigType,
    BotCreateDto,
    BotExtensionGetDto,
    botExtensionGetDtoToMetadata,
    BotModelContraints,
} from '@flipguard/webapp-api';
import { ScanResult } from '@flipguard/webapp-fluff-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotCreateMutation } from '../../api/mutations/tracking-bots';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../components/atoms/navigation/CustomLink';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { KeyboardChip } from '../../components/molecules/utils/KeyboardChip';
import { FluffEditorV2 } from '../../components/organisms/fluff-editor-v2/FluffEditorV2';
import { RoutePath } from '../../config/constants/navigation';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';

const ERRORS_FOUND_MSG = 'Resolve errors in your code first';

const INITIAL_CONFIG = `
# Event type that triggers your bot
trigger: "listing"

# Use extensions to import constants
use { xyz } from "..."

# Or define constants local to your bot
def number = 0.75
def text = "abc"
def color_trait = nft.traits["Color"]

preconditions:
    marketplace.chain == "Polygon"
    and collection.address == "..."
    
if:
    color_trait in ["red", "blue"]
then:
    discord.send({
        webhook: "...",
        template: "..."
    })
`.slice(1, -1);

type Props = {
    extensions: BotExtensionGetDto[];
};

export const CustomBotsCreate = ({ extensions }: Props) => {
    const { user } = useAuth();
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const createBotMutation = useBotCreateMutation();

    const [name, setName] = useState('');
    const [code, setCode] = useState<string[]>(INITIAL_CONFIG.split('\n'));
    const [errorsFound, setErrorsFound] = useState(false);

    const onLint = (_: ScanResult, errorsFound: boolean) => {
        setErrorsFound(errorsFound);
    };

    const onCreate = () => {
        const dto: BotCreateDto = {
            configType: BotConfigType.FLUFF,
            name: name,
            description: '',
            code: code.join('\n'),
        };

        createBotMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(RoutePath.CustomBots);
            },
        });
    };

    const creationDisabled = name === '' || errorsFound;

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
                <AssignmentOutlinedIcon />
                <HeaderText>Create Custom Bot</HeaderText>
                <Typography sx={{ flexGrow: 1 }} />
                <FadingTooltip title={'Open custom bots setup guide'} placement={'top'}>
                    <HelpOutlineIcon
                        onClick={() =>
                            window.open(
                                'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/custom-bots',
                                '_blank',
                            )
                        }
                        sx={{ color: '#81807f', '&:hover': { color: '#fff', cursor: 'pointer' } }}
                    />
                </FadingTooltip>
            </HeaderBox>
            <CustomTextField
                name={'Bot Name'}
                label={'Bot Name'}
                sx={{ margin: '8px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ maxLength: BotModelContraints.name.max }}
                required
            />
            <HeaderBox sx={{ marginBottom: '12px' }}>
                <SmartToyOutlinedIcon />
                <HeaderText>Configuration</HeaderText>
            </HeaderBox>
            <Typography sx={{ margin: '0 8px', fontSize: '13px' }}>
                Configuration of every custom bot is written in fluff - a language powering all of your bots under the
                hood.
            </Typography>
            <CustomLink
                sx={{ margin: '0 8px', marginTop: '8px', fontSize: '13px' }}
                href={'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/custom-bots'}
                target={'_blank'}
                rel={'noreferrer'}
            >
                Learn more about custom bots and fluff here
            </CustomLink>
            <Box sx={{ position: 'relative', marginTop: '8px' }}>
                <InputLikeBox
                    sx={{
                        padding: '8px',
                        margin: '8px',
                    }}
                >
                    <FluffEditorV2
                        code={code}
                        onChange={setCode}
                        onLint={onLint}
                        mode={'bot'}
                        ctx={{
                            readOnly: false,
                            eventTypes: [],
                            templates: user.metadata.templates,
                            integrations: user.metadata.integrations,
                            extensions: extensions.map(botExtensionGetDtoToMetadata),
                            permissions: user.details.permissions,
                        }}
                    />
                    <Box
                        sx={(theme) => ({
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderLeft: '1px solid #444',
                            borderBottom: '1px solid #444',
                            borderBottomLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            padding: '6px',
                            paddingRight: '8px',
                            width: '240px',
                            background: theme.palette.primary.main,
                        })}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <KeyboardChip sx={{ margin: 0 }} text={'Ctrl'} />
                            <KeyboardChip sx={{ marginRight: '8px' }} text={'Space'} />
                        </Box>
                        {'Autocomplete'}
                    </Box>
                </InputLikeBox>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.CustomBots)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={creationDisabled}
                    disableOnNoAuth={true}
                    loading={createBotMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onCreate}
                    tooltipMessage={errorsFound ? ERRORS_FOUND_MSG : undefined}
                >
                    Create Bot
                </PrimaryButton>
            </Box>
        </Card>
    );
};
