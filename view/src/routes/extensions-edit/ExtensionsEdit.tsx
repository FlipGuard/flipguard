import { BotExtensionGetDto } from '@flipguard/webapp-api';
import { ScanResult } from '@flipguard/webapp-fluff-api';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotExtensionUpdateMutation } from '../../api/mutations/extensions';
import { useBotRestartMutation } from '../../api/mutations/tracking-bots';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { FluffEditorV2 } from '../../components/organisms/fluff-editor-v2/FluffEditorV2';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';
import { EventTypeChip } from '../message-templates/chips/EventTypeChips';
import { ExtensionEditDialog } from './ExtensionEditDialog';

const ERRORS_FOUND_MSG = 'Resolve errors in your code first';

type Props = {
    extension: BotExtensionGetDto;
};

export const ExtensionsEdit = ({ extension: originalExtension }: Props) => {
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile();

    const updateMutation = useBotExtensionUpdateMutation();
    const restartBotMutation = useBotRestartMutation();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [code, setCode] = useState<string[]>(originalExtension.code.split('\n'));
    const [errorsFound, setErrorsFound] = useState(false);

    const isConfigChanged = !equal(originalExtension.code.split('\n'), code);
    const updateDisabled = errorsFound || !isConfigChanged;

    const onLint = (scanResult: ScanResult, errorsFound: boolean) => {
        setErrorsFound(errorsFound);
    };

    const onUpdate = (botsToRestart: string[]) => {
        updateMutation.mutate(
            {
                extensionId: originalExtension.id,
                dto: {
                    description: '',
                    code: code.join('\n'),
                },
            },
            {
                onSettled: () => {
                    setDialogOpen(false);
                },
                onSuccess: () => {
                    setLocation(RoutePath.Extensions);
                    botsToRestart.forEach((botId) => {
                        restartBotMutation.mutate(botId);
                    });
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
                {originalExtension.triggers.map((trigger, idx) => (
                    <EventTypeChip sx={{ marginRight: '8px' }} key={idx} type={trigger} />
                ))}
                <HeaderText sx={{ marginLeft: '4px' }}>{originalExtension.id}</HeaderText>
            </HeaderBox>
            <Box>
                <InputLikeBox sx={{ padding: '8px', margin: '8px', minHeight: '142px' }}>
                    <FluffEditorV2
                        code={code}
                        onChange={setCode}
                        onLint={onLint}
                        mode={'extension'}
                        ctx={{
                            eventTypes: originalExtension.triggers,
                            integrations: [],
                            templates: [],
                            extensions: [],
                            permissions: [],
                            readOnly: false,
                        }}
                    />
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
                    disabled={updateDisabled}
                    disableOnNoAuth={true}
                    loading={dialogOpen}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={() => setDialogOpen(true)}
                    tooltipMessage={errorsFound ? ERRORS_FOUND_MSG : undefined}
                >
                    Update Extension
                </PrimaryButton>
            </Box>
            <ExtensionEditDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                extensionId={originalExtension.id}
                onUpdate={onUpdate}
                isUpdateLoading={updateMutation.isLoading}
            />
        </Card>
    );
};
