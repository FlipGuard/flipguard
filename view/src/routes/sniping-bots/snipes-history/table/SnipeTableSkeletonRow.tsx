import { Box, Skeleton, styled } from '@mui/material';
import React from 'react';

import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { oneOf, random } from '../../../../utils/math';

const CustomSkeleton = styled(Skeleton)({
    height: '24px',
});

export const SnipeTableSkeletonRow = () => {
    return (
        <CustomTableRow>
            <CustomTableCell sx={{ padding: '12px 16px' }}>
                <CustomSkeleton sx={{ width: random(128, 192, 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: random(64, 128, 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton sx={{ height: '24px', width: '24px', marginRight: '12px' }} variant={'circular'} />
                    <CustomSkeleton sx={{ width: random(96, 128, 'px') }} variant={'rounded'} />
                </Box>
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: '100px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: oneOf([96, 128], 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: '100px' }} variant={'rounded'} />
            </CustomTableCell>
        </CustomTableRow>
    );
};
