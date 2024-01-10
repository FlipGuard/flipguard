import { FlipBotGlobalGuildConfigGetDto, FlipExecutedGetDto } from '@flipguard/webapp-api';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { useAuth } from '../../../../hooks/use-auth';
import { FlipFeedTableHeader } from './FlipFeedTableHeader';
import { FlipFeedTableRow } from './FlipFeedTableRow';
import { FlipFeedTableRowContext, FlipFeedTableRowData, FlipFeedTableVirtualTableComponents } from './Virtuoso';

function headerContent() {
    return <FlipFeedTableHeader />;
}

function rowContent(idx: number, row: FlipFeedTableRowData, ctx: FlipFeedTableRowContext) {
    return <FlipFeedTableRow row={row} ctx={ctx} />;
}

type Props = {
    flips: FlipExecutedGetDto[];
    verifiedCommunities: Record<string, FlipBotGlobalGuildConfigGetDto>;
};

export const FlipFeedTable = ({ flips, verifiedCommunities }: Props) => {
    const theme = useTheme();
    const { user } = useAuth();

    return (
        <Box sx={{ height: '76vh' }}>
            <TableVirtuoso
                style={{
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.primary.main,
                    border: '1px solid #282828',
                    borderRadius: '6px',
                    boxShadow: 'none',
                }}
                data={flips}
                components={FlipFeedTableVirtualTableComponents}
                context={{ currentUserId: user.id, communities: verifiedCommunities }}
                fixedHeaderContent={headerContent}
                itemContent={rowContent}
                increaseViewportBy={256}
            />
        </Box>
    );
};
