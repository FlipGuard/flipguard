import SaveIcon from '@mui/icons-material/Save';
import { Box, DialogActions, DialogContent, DialogContentText, Divider } from '@mui/material';
import React, { useState } from 'react';

import { ConfirmDialogBase } from '../../components/atoms/feedback/dialog/ConfirmDialogBase';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { CustomCheckbox } from '../../components/atoms/inputs/checkbox/CustomCheckbox';
import { AffectedBotsDialogBox } from '../../components/molecules/utils/AffectedBotsDialogBox';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';

type Props = {
    open: boolean;
    handleClose: () => void;
    templateId: string;
    onUpdate: (botsToRestart: string[]) => void;
    isUpdateLoading: boolean;
};

export const MessageTemplateEditDialog = ({ open, handleClose, templateId, onUpdate, isUpdateLoading }: Props) => {
    const { user } = useAuth();
    const isMobile = isViewMobile('sm');

    const [restartBots, setRestartBots] = useState(true);

    const affectedBots = Object.values(user.metadata.bots)
        .filter((bot) => bot.usedTemplates.includes(templateId) && bot.active)
        .map((bot) => ({ id: bot.id, name: bot.name }));

    return (
        <ConfirmDialogBase isOpen={open} onClose={handleClose} title={`Update "${templateId}"?`}>
            <DialogContent sx={{ padding: '12px' }}>
                <DialogContentText>
                    You will have to restart already running bots that use this template for the change to occur.
                </DialogContentText>
                <Divider sx={{ margin: '16px 0' }} />
                <AffectedBotsDialogBox affectedBots={affectedBots.map(({ name }) => name)} />
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    padding: '12px',
                }}
            >
                <TertiaryButton onClick={handleClose}>Cancel</TertiaryButton>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isMobile ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                            {affectedBots.length > 0 && (
                                <CustomCheckbox
                                    boxProps={{ sx: { paddingRight: 0, marginBottom: '8px', border: 'none' } }}
                                    label={'Restart bots'}
                                    checked={restartBots}
                                    onChange={setRestartBots}
                                />
                            )}
                            <PrimaryButton
                                onClick={() => onUpdate(restartBots ? affectedBots.map((b) => b.id) : [])}
                                icon={SaveIcon}
                                loading={isUpdateLoading}
                                loadingPosition={'start'}
                            >
                                {'Update'}
                            </PrimaryButton>
                        </Box>
                    ) : (
                        <>
                            {affectedBots.length > 0 && (
                                <CustomCheckbox
                                    boxProps={{ sx: { marginRight: '16px', border: 'none' } }}
                                    label={'Restart bots'}
                                    checked={restartBots}
                                    onChange={setRestartBots}
                                />
                            )}
                            <PrimaryButton
                                onClick={() => onUpdate(restartBots ? affectedBots.map((b) => b.id) : [])}
                                icon={SaveIcon}
                                loading={isUpdateLoading}
                                loadingPosition={'start'}
                            >
                                {'Update'}
                            </PrimaryButton>
                        </>
                    )}
                </Box>
            </DialogActions>
        </ConfirmDialogBase>
    );
};
