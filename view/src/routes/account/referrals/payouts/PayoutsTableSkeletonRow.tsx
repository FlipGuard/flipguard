import { Skeleton, styled } from '@mui/material';

import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { oneOf } from '../../../../utils/math';

const CustomSkeleton = styled(Skeleton)({
    height: '24px',
});

export const PayoutsTableSkeletonRow = () => {
    return (
        <CustomTableRow>
            <CustomTableCell sx={{ padding: '12px 16px' }}>
                <CustomSkeleton sx={{ margin: '0 auto', width: '96px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ margin: '0 auto', width: oneOf([48, 64], 'px') }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ margin: '0 auto', width: '128px' }} variant={'rounded'} />
            </CustomTableCell>
            <CustomTableCell>
                <CustomSkeleton sx={{ margin: '0 auto', width: oneOf([96, 128], 'px') }} variant={'rounded'} />
            </CustomTableCell>
        </CustomTableRow>
    );
};
