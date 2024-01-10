import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { PrimaryButton } from '../../atoms/inputs/button/PrimaryButton';

type Props = {
    disabled: boolean;
    loading: boolean;
    onClick: () => void;
    actionTitle: string;
};

export const ActionFooter = ({ disabled, loading, onClick, actionTitle }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                margin: '8px',
                marginTop: '16px',
            }}
        >
            <Typography sx={{ flexGrow: 1 }} />
            <PrimaryButton
                disabled={disabled}
                disableOnNoAuth={true}
                loading={loading}
                loadingPosition={'start'}
                icon={SaveIcon}
                onClick={onClick}
            >
                {actionTitle}
            </PrimaryButton>
        </Box>
    );
};
