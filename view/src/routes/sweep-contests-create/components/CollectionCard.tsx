import { SweepContestCollection, SweepContestType } from '@flipguard/webapp-api';
import { Box, Typography } from '@mui/material';

import { RemovableElement } from '../../../components/atoms/inputs/utils/RemovableElement';
import { useCollectionName } from '../../../hooks/use-collection-name';
import isViewMobile from '../../../hooks/utils/isViewMobile';

type Props = {
    collection: SweepContestCollection;
    entries: number;
    sweepContestType: SweepContestType;
    onRemove: () => void;
};

export const CollectionCard = ({ collection, entries, sweepContestType, onRemove }: Props) => {
    const isMobile = isViewMobile('sm');

    const collectionName = useCollectionName(collection.address) ?? '?';

    const formatAddress = (address: string) => {
        return isMobile ? address.substring(0, 6) + '...' + address.substring(address.length - 6) : address;
    };

    return (
        <RemovableElement onDelete={onRemove} sx={{ width: '100%' }}>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '12px 16px',
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: '#aaa' }}>Address:</Typography>
                    <Typography sx={{ marginLeft: '8px' }}>
                        {formatAddress(collection.address.toLowerCase())}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: '#aaa' }}>Name:</Typography>
                    <Typography sx={{ marginLeft: '8px' }}>{collectionName}</Typography>
                </Box>
                {sweepContestType === SweepContestType.QUANTITY && (
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ color: '#aaa' }}>Entries:</Typography>
                        <Typography sx={{ marginLeft: '8px' }}>{entries}</Typography>
                    </Box>
                )}
            </Box>
        </RemovableElement>
    );
};
