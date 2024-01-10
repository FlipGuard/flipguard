import { SweepContestLeaderboardDto, SweepContestParticipant } from '@flipguard/webapp-api';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useState } from 'react';

import { isWalletBanned, isWalletSuspicious, isWalletVerified } from '../../../../utils/sweep-contests';
import { ActivityStatusIcon } from '../utils/ActivityStatusIcon';
import { BannedWalletDialog } from './status-dialogs/BannedWalletDialog';
import { SuspiciousWalletDialog } from './status-dialogs/SuspiciousWalletDialog';
import { VerifiedWalletDialog } from './status-dialogs/VerifiedWalletDialog';

type Props = {
    sweepContest: SweepContestLeaderboardDto;
    participant: SweepContestParticipant;
};

export const ParticipantStatusIcon = ({ sweepContest, participant }: Props) => {
    const [open, setOpen] = useState(false);

    if (!sweepContest.detailed) {
        return null;
    }

    if (isWalletBanned(participant.address, sweepContest)) {
        return (
            <>
                <ActivityStatusIcon
                    title={'Blocked'}
                    icon={BlockOutlinedIcon}
                    backgroundColor={'#cb3e3e'}
                    iconColor={'#310101'}
                    onClick={() => setOpen(true)}
                />
                <BannedWalletDialog
                    sweepContestId={sweepContest.id}
                    participant={participant}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </>
        );
    }

    if (isWalletVerified(participant, sweepContest)) {
        return (
            <>
                <ActivityStatusIcon
                    title={'Verified'}
                    icon={CheckCircleOutlinedIcon}
                    backgroundColor={'#35ab58'}
                    iconColor={'#000'}
                    onClick={() => setOpen(true)}
                />
                <VerifiedWalletDialog
                    sweepContestId={sweepContest.id}
                    participant={participant}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </>
        );
    }

    if (isWalletSuspicious(participant, sweepContest)) {
        return (
            <>
                <ActivityStatusIcon
                    title={'Suspicious'}
                    icon={ErrorOutlineOutlinedIcon}
                    backgroundColor={'#f8bd4f'}
                    iconColor={'#000'}
                    onClick={() => setOpen(true)}
                />
                <SuspiciousWalletDialog
                    sweepContestId={sweepContest.id}
                    participant={participant}
                    suspiciousInfo={sweepContest.leaderboard.metadata.wallets.suspicious[participant.address]}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </>
        );
    }

    return null;
};
