import { formatNumberForUi } from '@flipguard/commons';
import {
    SweepContestLeaderboardDto,
    SweepContestParticipant,
    SweepContestPickedWinners,
    SweepContestSale,
    SweepContestSaleStatus,
    SweepContestType,
    SweepContestWalletStatus,
    SweepContestWinnerGroupType,
    WinnerGroup,
} from '@flipguard/webapp-api';

export const getWinChances = (sc: SweepContestLeaderboardDto, winnerGroup: WinnerGroup): Record<string, number> => {
    const nonBanned = sc.leaderboard.participants.filter((p) => !isWalletBanned(p.address, sc));
    const scores = nonBanned.map((p) => p.score);

    if (winnerGroup.type === SweepContestWinnerGroupType.WEIGHTED_RANDOM) {
        const totalScore = scores.reduce((a, b) => a + b, 0);
        return Object.fromEntries(
            sc.leaderboard.participants.map((p) => {
                return [p.address, isWalletBanned(p.address, sc) ? 0 : (p.score / totalScore) * 100];
            }),
        );
    } else if (winnerGroup.type === SweepContestWinnerGroupType.RANDOM) {
        const totalParticipants = nonBanned.length;
        return Object.fromEntries(
            sc.leaderboard.participants.map((p) => {
                return [p.address, isWalletBanned(p.address, sc) ? 0 : (1 / totalParticipants) * 100];
            }),
        );
    } else {
        const participantsPerScore: Record<number, number> = {};
        nonBanned.forEach((p) => {
            participantsPerScore[p.score] ??= 0;
            participantsPerScore[p.score]++;
        });

        const result: Record<string, number> = {};
        const sortedScores = scores.filter((score) => score > 0).sort((a, b) => b - a);
        const winningScores = sortedScores.slice(0, winnerGroup.winners);

        let winnersLeft = winnerGroup.winners;
        sc.leaderboard.participants.forEach((p) => {
            if (isWalletBanned(p.address, sc) || !winningScores.includes(p.score)) {
                result[p.address] = 0;
            } else if (participantsPerScore[p.score] <= winnersLeft) {
                result[p.address] = 100;
                participantsPerScore[p.score]--;
                winnersLeft--;
            } else {
                result[p.address] = (winnersLeft / participantsPerScore[p.score]) * 100;
            }
        });

        return result;
    }
};

export const getSalesCount = (sc: SweepContestLeaderboardDto): Record<string, number> => {
    const result: Record<string, number> = {};

    sc.leaderboard.sales.forEach((s) => {
        result[s.buyer] ??= 0;
        result[s.buyer]++;
    });

    return result;
};

export const getUsdVolumes = (sc: SweepContestLeaderboardDto): Record<string, number> => {
    const result: Record<string, number> = {};

    sc.leaderboard.sales.forEach((s) => {
        result[s.buyer] ??= 0;
        result[s.buyer] += s.price.usdAmount;
    });

    return result;
};

export const formatScore = (score: number, type: SweepContestType, tokenUsdPrice?: number) => {
    if (type === SweepContestType.QUANTITY) {
        return '' + score;
    }

    if (!tokenUsdPrice) {
        return '-';
    }

    return '~ ' + formatNumberForUi(score / tokenUsdPrice, false);
};

export const moveWinnersToStart = <T extends { walletAddress: string }>(
    sweepContestWinners: SweepContestPickedWinners | undefined,
    participants: T[],
): T[] => {
    if (!sweepContestWinners) {
        return participants;
    }

    const winners: T[] = [];
    const losers: T[] = [];

    for (const participant of participants) {
        if (sweepContestWinners.pickedWinners.includes(participant.walletAddress)) {
            winners.push(participant);
        } else {
            losers.push(participant);
        }
    }

    return winners.concat(losers);
};

export const isSaleBanned = (s: SweepContestSale, sc: SweepContestLeaderboardDto) => {
    return sc.detailed && sc.settings.sales[s.id] === SweepContestSaleStatus.BLOCKED;
};

export const isSaleSuspicious = (s: SweepContestSale, sc: SweepContestLeaderboardDto) => {
    return sc.detailed && s.id in sc.leaderboard.metadata.sales.suspicious;
};

export const isSaleVerified = (s: SweepContestSale, sc: SweepContestLeaderboardDto) => {
    return sc.detailed && sc.settings.sales[s.id] === SweepContestSaleStatus.VERIFIED;
};

export const isWalletBanned = (address: string, sc: SweepContestLeaderboardDto) => {
    return sc.detailed && sc.settings.wallets[address] === SweepContestWalletStatus.BLOCKED;
};

export const isWalletSuspicious = (p: SweepContestParticipant, sc: SweepContestLeaderboardDto) => {
    return sc.detailed && p.address in sc.leaderboard.metadata.wallets.suspicious;
};

export const isWalletVerified = (p: SweepContestParticipant, sc: SweepContestLeaderboardDto) => {
    return sc.detailed && sc.settings.wallets[p.address] === SweepContestWalletStatus.VERIFIED;
};
