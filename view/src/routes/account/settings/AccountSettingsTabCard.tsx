import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Card, CardProps, styled } from '@mui/material';
import React, { useState } from 'react';

import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { HeaderBox } from '../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../components/atoms/utils/HeaderText';
import { useAuth } from '../../../hooks/use-auth';
import { formatTimeUntil } from '../../../utils/timestamps';
import { AccountDeletionConfirmationDialog } from './AccountDeletionConfirmationDialog';

const StyledCard = styled(Card)({
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 8px',
    paddingBottom: '4px',
});

export const AccountSettingsTabCard = (props: CardProps) => {
    const { user } = useAuth();

    const [dialogOpen, setDialogOpen] = useState(false);

    const tooltipMsg =
        user.model.deactivatedAt > 0
            ? `Your account will be deleted ${formatTimeUntil(
                  user.model.deactivatedAt + 14 * 24 * 3600 * 1000,
                  false,
              )}. Contact us on Discord if you wish to cancel your account deletion process.`
            : '';

    return (
        <StyledCard {...props}>
            <HeaderBox sx={{ marginTop: 0 }}>
                <SettingsOutlinedIcon />
                <HeaderText>Settings</HeaderText>
            </HeaderBox>
            <Box sx={{ margin: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                <PrimaryButton
                    onClick={() => setDialogOpen(true)}
                    disabled={user.model.deactivatedAt > 0}
                    tooltipMessage={tooltipMsg}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.errorButton.main,
                        '&:hover': {
                            backgroundColor: theme.palette.errorButton.light,
                            boxShadow: 2,
                        },
                    })}
                >
                    Deactivate account
                </PrimaryButton>
            </Box>
            <AccountDeletionConfirmationDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} />
        </StyledCard>
    );
};
