import { Skeleton, Stack, styled } from '@mui/material';
import React from 'react';

import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { oneOf, random } from '../../../../utils/math';

const CustomSkeleton = styled(Skeleton)({
    height: '24px',
});

export const SkeletonRow = () => {
    return (
        <CustomTableRow>
            <CustomTableCell sx={{ padding: '12px 16px' }}>
                <CustomSkeleton sx={{ minWidth: '168px', width: random(50, 90, '%') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: oneOf([75, 100], 'px'), borderRadius: '16px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: oneOf([24, 32], 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: oneOf([96, 128], 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <Stack direction={'row'} justifyContent={'center'}>
                    <Skeleton sx={{ height: '24px', width: '24px' }} variant={'circular'} />
                    <Skeleton sx={{ height: '24px', width: '24px', marginLeft: '8px' }} variant={'circular'} />
                </Stack>
            </CustomTableCell>
        </CustomTableRow>
    );
};
