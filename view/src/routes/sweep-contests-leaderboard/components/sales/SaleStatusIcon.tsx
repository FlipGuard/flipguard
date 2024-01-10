import { SweepContestLeaderboardDto, SweepContestSale } from '@flipguard/webapp-api';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useState } from 'react';

import { isSaleBanned, isSaleSuspicious, isSaleVerified } from '../../../../utils/sweep-contests';
import { ActivityStatusIcon } from '../utils/ActivityStatusIcon';
import { BannedSaleDialog } from './status-dialogs/BannedSaleDialog';
import { SuspiciousSaleDialog } from './status-dialogs/SuspiciousSaleDialog';
import { VerifiedSaleDialog } from './status-dialogs/VerifiedSaleDialog';

type Props = {
    sweepContest: SweepContestLeaderboardDto;
    sale: SweepContestSale;
};

export const SaleStatusIcon = ({ sweepContest, sale }: Props) => {
    const [open, setOpen] = useState(false);

    if (!sweepContest.detailed) {
        return null;
    }

    if (isSaleBanned(sale, sweepContest)) {
        return (
            <>
                <ActivityStatusIcon
                    title={'Blocked'}
                    icon={BlockOutlinedIcon}
                    backgroundColor={'#cb3e3e'}
                    iconColor={'#310101'}
                    onClick={() => setOpen(true)}
                />
                <BannedSaleDialog
                    sweepContestId={sweepContest.id}
                    sale={sale}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </>
        );
    }

    if (isSaleVerified(sale, sweepContest)) {
        return (
            <>
                <ActivityStatusIcon
                    title={'Verified'}
                    icon={CheckCircleOutlinedIcon}
                    backgroundColor={'#35ab58'}
                    iconColor={'#000'}
                    onClick={() => setOpen(true)}
                />
                <VerifiedSaleDialog
                    sweepContestId={sweepContest.id}
                    sale={sale}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </>
        );
    }

    if (isSaleSuspicious(sale, sweepContest)) {
        return (
            <>
                <ActivityStatusIcon
                    title={'Suspicious'}
                    icon={ErrorOutlineOutlinedIcon}
                    backgroundColor={'#f8bd4f'}
                    iconColor={'#000'}
                    onClick={() => setOpen(true)}
                />
                <SuspiciousSaleDialog
                    sweepContestId={sweepContest.id}
                    sale={sale}
                    suspiciousInfo={sweepContest.leaderboard.metadata.sales.suspicious[sale.id]}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </>
        );
    }

    return null;
};
