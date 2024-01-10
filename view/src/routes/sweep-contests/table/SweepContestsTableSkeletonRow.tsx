import { Divider, Skeleton, Stack, styled } from '@mui/material';
import React from 'react';

import { CustomTableCell, CustomTableRow } from '../../../components/molecules/table/CustomTable';
import { oneOf, random } from '../../../utils/math';

const CustomSkeleton = styled(Skeleton)({
    height: '24px',
});

export const SweepContestsTableSkeletonRow = () => {
    return (
        <CustomTableRow>
            <CustomTableCell sx={{ padding: '12px 16px' }}>
                <CustomSkeleton sx={{ width: random(128, 192, 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: '100px', borderRadius: '16px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: '32px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: oneOf([96, 128], 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ width: oneOf([96, 128], 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    divider={<Divider sx={{ margin: '0 8px' }} orientation="vertical" flexItem />}
                >
                    <Stack direction={'row'} justifyContent={'center'}>
                        <Skeleton sx={{ height: '24px', width: '24px' }} variant={'circular'} />
                        <Skeleton sx={{ height: '24px', width: '24px', marginLeft: '8px' }} variant={'circular'} />
                    </Stack>
                    <Stack direction={'row'} justifyContent={'center'}>
                        <Skeleton sx={{ height: '24px', width: '24px' }} variant={'circular'} />
                    </Stack>
                </Stack>
            </CustomTableCell>
        </CustomTableRow>
    );
};
