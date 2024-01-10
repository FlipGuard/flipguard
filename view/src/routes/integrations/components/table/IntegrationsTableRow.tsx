import { Integration } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { FadingTooltip } from '../../../../components/atoms/feedback/tooltip/FadingTooltip';
import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { RoutePath } from '../../../../config/constants/navigation';
import { useAuth } from '../../../../hooks/use-auth';
import { useIntegrationValueValidation } from '../../../../hooks/validation/integration';
import { formatTimeAgo } from '../../../../utils/timestamps';
import { IntegrationTypeChip } from '../../chips/IntegrationTypeChips';
import { IntegrationDeleteDialog } from '../IntegrationDeleteDialog';

type Props = {
    integration: Integration;
};

export const IntegrationsTableRow = ({ integration }: Props) => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const { error } = useIntegrationValueValidation(integration);

    const timesUsed = Object.values(user.metadata.bots)
        .map((b) => b.usedIntegrations.filter((i) => i === integration.id).length)
        .reduce((a, b) => a + b, 0);

    return (
        <CustomTableRow>
            <CustomTableCell
                sx={{
                    paddingLeft: '16px',
                    textOverflow: 'ellipsis',
                    maxWidth: '256px',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {error !== '' && (
                        <FadingTooltip title={error} placement={'top'}>
                            <ErrorOutlineOutlinedIcon
                                sx={{
                                    fontSize: '24px',
                                    marginRight: '8px',
                                    color: '#d73434',
                                }}
                            />
                        </FadingTooltip>
                    )}
                    {integration.id}
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <IntegrationTypeChip type={integration.type} />
            </CustomTableCell>
            <CustomTableCell>{timesUsed}</CustomTableCell>
            <CustomTableCell>{formatTimeAgo(integration.updatedAt)}</CustomTableCell>
            <CustomTableCell>
                <Stack direction={'row'} justifyContent={'center'}>
                    <IconButton
                        sx={{ color: '#fff' }}
                        onClick={() => setLocation(RoutePath.IntegrationsEdit + '/' + integration.id)}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }} onClick={() => setDeleteDialogOpen(true)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Stack>
            </CustomTableCell>
            <IntegrationDeleteDialog
                integration={integration}
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
            />
        </CustomTableRow>
    );
};
