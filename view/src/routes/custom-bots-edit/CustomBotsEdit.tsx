import {
    BotConfigType,
    BotExtensionGetDto,
    botExtensionGetDtoToMetadata,
    BotGetDto,
    BotModelContraints,
    BotUpdateDto,
} from '@flipguard/webapp-api';
import { ScanResult } from '@flipguard/webapp-fluff-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotUpdateMutation } from '../../api/mutations/tracking-bots';
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

type Props = {
    bot: BotGetDto;
    extensions: BotExtensionGetDto[];
};

export const CustomBotsEdit = ({ bot: originalBot, extensions }: Props) => {
    const { user } = useAuth();
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const updateBotMutation = useBotUpdateMutation();

    const [name, setName] = useState(originalBot.name);
    const [code, setCode] = useState<string[]>(originalBot.code.split('\n'));
    const [errorsFound, setErrorsFound] = useState(false);

    const onLint = (_: ScanResult, errorsFound: boolean) => {
        setErrorsFound(errorsFound);
    };

    const onUpdate = () => {
        const dto: BotUpdateDto = {
            configType: BotConfigType.FLUFF,
            name: name,
            code: code.join('\n'),
        };

        updateBotMutation.mutate(
            { botId: originalBot.id, dto },
            {
                onSuccess: () => {
                    setLocation(RoutePath.CustomBots);
                },
            },
        );
    };

    const equalConfig = name === originalBot.name && code.join('\n') === originalBot.code;
    const updateDisabled = name === '' || errorsFound || equalConfig;

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
                <HeaderText>{`Edit "${originalBot.name}"`}</HeaderText>
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
                    <Typography>{originalBot.id.substring(0, 8)}</Typography>
                </Box>
            </InputLikeBox>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#444', margin: '8px', marginTop: '16px' }} />
            <CustomTextField
                name={'Bot Name'}
                label={'Bot Name'}
                sx={{
                    margin: '8px',
                    marginTop: '12px',
                }}
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
                        minHeight: '142px',
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
                    disabled={updateDisabled}
                    disableOnNoAuth={true}
                    loading={updateBotMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onUpdate}
                    tooltipMessage={errorsFound ? ERRORS_FOUND_MSG : undefined}
                >
                    Update Bot
                </PrimaryButton>
            </Box>
        </Card>
    );
};
