import { Skeleton, Stack, styled } from '@mui/material';

import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { oneOf } from '../../../../utils/math';

const CustomSkeleton = styled(Skeleton)({
    height: '24px',
});

export const OrdersTableSkeletonRow = () => {
    return (
        <CustomTableRow>
            <CustomTableCell sx={{ padding: '12px 16px' }}>
                <CustomSkeleton sx={{ margin: '0 auto', width: '96px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton
                    sx={{ margin: '0 auto', width: oneOf([75, 100], 'px'), borderRadius: '16px' }}
                    variant={'rounded'}
                />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ margin: '0 auto', width: oneOf([48, 64], 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ margin: '0 auto', width: '128px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton
                    sx={{ margin: '0 auto', width: oneOf([75, 100], 'px'), borderRadius: '16px' }}
                    variant={'rounded'}
                />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ margin: '0 auto', width: oneOf([96, 128], 'px') }} variant={'rounded'} />
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
