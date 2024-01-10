import { NftEventType } from '@flipguard/domain';
import { botExtensionConstraints } from '@flipguard/webapp-api';
import { ScanResult } from '@flipguard/webapp-fluff-api';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotExtensionCreateMutation } from '../../api/mutations/extensions';
import { InfoAlert } from '../../components/atoms/feedback/alert/InfoAlert';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomCheckbox } from '../../components/atoms/inputs/checkbox/CustomCheckbox';
import { CustomTextField } from '../../components/atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../components/atoms/navigation/CustomLink';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { KeyboardChip } from '../../components/molecules/utils/KeyboardChip';
import { FluffEditorV2 } from '../../components/organisms/fluff-editor-v2/FluffEditorV2';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { validateExtension } from '../../hooks/validation/extension';

const ERRORS_FOUND_MSG = 'Resolve errors in your code first';

const POSSIBLE_TRIGGERS: NftEventType[] = [NftEventType.Listing, NftEventType.Sale];

const INITIAL_STATE: string[] = `
# Numeric data type
def number = 1

# Text data type
def text = "text"

# You can assign variables to your constants
def color = nft.traits["Color"]

# Add logic via switches
def is_red = switch {
    case color == "Red" => 1
    default             => 0
}
`
    .trim()
    .split('\n');

export const ExtensionsCreate = () => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const createExtensionMutation = useBotExtensionCreateMutation();

    const [name, setName] = useState('');
    const [triggers, setTriggers] = useState(POSSIBLE_TRIGGERS);
    const [code, setCode] = useState<string[]>(INITIAL_STATE);
    const [errorsFound, setErrorsFound] = useState(false);

    const idValidationError = validateExtension(name);
    const creationDisabled = errorsFound || triggers.length === 0 || name === '' || idValidationError !== '';

    const onLint = (scanResult: ScanResult, errorsFound: boolean) => {
        setErrorsFound(errorsFound);
    };

    const onTriggerCheck = (trigger: NftEventType) => {
        setTriggers((prev) => {
            const checked = prev.includes(trigger);
            if (checked) {
                return prev.length > 1 ? prev.filter((type) => type !== trigger) : prev;
            } else {
                return [...prev, trigger];
            }
        });
    };

    const onCreate = () => {
        createExtensionMutation.mutate(
            {
                id: name,
                description: '',
                code: code.join('\n'),
                triggers: triggers,
            },
            {
                onSuccess: () => {
                    setLocation(RoutePath.Extensions);
                },
            },
        );
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
                <AssignmentOutlinedIcon />
                <HeaderText>Create Extension</HeaderText>
            </HeaderBox>
            <CustomTextField
                name={'Extension Name'}
                label={'Extension Name'}
                sx={{
                    margin: '8px',
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ maxLength: botExtensionConstraints.id.max }}
                error={idValidationError !== ''}
                helperText={idValidationError}
                required
            />
            <HeaderBox>
                <ViewInArOutlinedIcon />
                <HeaderText>Triggers</HeaderText>
            </HeaderBox>
            <Box
                sx={{
                    margin: '4px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'start',
                }}
            >
                {POSSIBLE_TRIGGERS.map((trigger, idx) => (
                    <CustomCheckbox
                        key={idx}
                        boxProps={{ sx: { margin: '0 4px 8px -4px' } }}
                        label={trigger.charAt(0) + trigger.substring(1).toLowerCase()}
                        checked={triggers.includes(trigger)}
                        withNoBorder={true}
                        onChange={() => onTriggerCheck(trigger)}
                    />
                ))}
            </Box>
            <InfoAlert sx={{ margin: '0 8px' }}>
                Your extension code will have access only to variables that exist for events from all selected triggers
            </InfoAlert>
            <HeaderBox sx={{ marginBottom: '12px' }}>
                <ExtensionOutlinedIcon />
                <HeaderText>Configuration</HeaderText>
            </HeaderBox>
            <Typography sx={{ margin: '0 8px', fontSize: '13px' }}>
                Configuration of every extension is written in fluff - a language powering all of your bots under the
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
                <InputLikeBox sx={{ padding: '8px', margin: '8px', minHeight: '142px' }}>
                    <FluffEditorV2
                        code={code}
                        onChange={setCode}
                        onLint={onLint}
                        mode={'extension'}
                        ctx={{
                            eventTypes: triggers,
                            integrations: [],
                            templates: [],
                            extensions: [],
                            permissions: [],
                            readOnly: false,
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
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.Extensions)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={creationDisabled}
                    disableOnNoAuth={true}
                    loading={createExtensionMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onCreate}
                    tooltipMessage={errorsFound ? ERRORS_FOUND_MSG : undefined}
                >
                    Create Extension
                </PrimaryButton>
            </Box>
        </Card>
    );
};
