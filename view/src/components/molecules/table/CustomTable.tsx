import {
    Box,
    Card,
    CardProps,
    styled,
    Table,
    TableBody,
    TableCell,
    TableCellProps,
    TableHead,
    TableRow,
    TableRowProps,
} from '@mui/material';
import React, { ComponentType, ReactNode, useEffect, useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: '6px 8px',
    borderColor: theme.palette.primaryBorder.main,
    textWrap: 'nowrap',
}));

export const CustomTableCell = (props: TableCellProps) => <StyledTableCell {...props} />;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const CustomTableRow = (props: TableRowProps) => <StyledTableRow {...props} />;

const CustomContainer = styled(Card)(({ theme }) => ({
    borderColor: theme.palette.primaryBorder.main,
}));

type Props = CardProps & {
    header: ComponentType<{ empty?: boolean }>;
    children: ReactNode;
    loading: boolean;
    skeletonRow?: ComponentType;
    empty?: boolean;
};

export const CustomTable = ({ header, children, loading, skeletonRow, empty, ...cardProps }: Props) => {
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => setShowSkeleton(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setShowSkeleton(false);
        }
    }, [loading]);

    if (loading && !showSkeleton) {
        return null;
    }

    const Header = header;
    const SkeletonRow = skeletonRow ?? React.Fragment;

    return (
        <CustomContainer {...cardProps}>
            <Box sx={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <Header empty={empty} />
                    </TableHead>
                    <TableBody>
                        {showSkeleton ? Array.from({ length: 3 }).map((_, idx) => <SkeletonRow key={idx} />) : children}
                    </TableBody>
                </Table>
            </Box>
        </CustomContainer>
    );
};
