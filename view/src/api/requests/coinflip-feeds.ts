import { FlipExecutedGetDto, FlipProfileGetDto } from '@flipguard/webapp-api';
import { QueryKey } from '@tanstack/react-query';

import { queryClient } from '../../config/react-query';
import { getEventSource } from '../event-source';
import { apiClient } from '../http-client';
import { FlipProfileQueryKeys } from './flip-profiles';

const MAX_FEED_SIZE = 256;

export const CoinFlipFeedsQueryKeys = {
    all: ['coinflip-feeds'] as const,
    global: () => [...CoinFlipFeedsQueryKeys.all, 'global'] as const,
    guild: (guildId: string) => [...CoinFlipFeedsQueryKeys.all, 'guild', guildId] as const,
    user: () => [...CoinFlipFeedsQueryKeys.all, 'me'] as const,
    userPending: () => [...CoinFlipFeedsQueryKeys.user(), 'pending'] as const,
    userExecutedFlips: () => [...CoinFlipFeedsQueryKeys.user(), 'executed'] as const,
};

export const openRecentUserFlipsStream = (userId: string) => {
    const getUrl = '/coinflip/flips/recent/me';
    const streamUrl = '/coinflip/flips/recent/me/stream';
    return openFlipsStream(userId, getUrl, streamUrl);
};

export const openRecentGuildFlipsStream = (userId: string, guildId: string) => {
    const getUrl = `/coinflip/flips/recent/${guildId}`;
    const streamUrl = `/coinflip/flips/recent/${guildId}/stream`;
    return openFlipsStream(userId, getUrl, streamUrl);
};

export const openRecentGlobalFlipsStream = (userId: string) => {
    const getUrl = '/coinflip/flips/recent';
    const streamUrl = '/coinflip/flips/recent/stream';
    return openFlipsStream(userId, getUrl, streamUrl);
};

const openFlipsStream = (uid: string, getUrl: string, streamUrl: string) => {
    apiClient.get<FlipExecutedGetDto[]>(getUrl).then(({ data }) => data.forEach((f) => handleFlipPush(f, uid, true)));
    const source = getEventSource(streamUrl);
    source.ev.addEventListener('cancel', (e) => handleFlipCancel(JSON.parse((e as MessageEvent).data)));
    source.ev.addEventListener('push', (e) => handleFlipPush(JSON.parse((e as MessageEvent).data), uid));
    return { close: () => source.close() };
};

const handleFlipCancel = ({ flipId, guildId }: { flipId: string; guildId: string }) => {
    removeFlipFromFeed(CoinFlipFeedsQueryKeys.global(), flipId);
    removeFlipFromFeed(CoinFlipFeedsQueryKeys.guild(guildId), flipId);
    removeFlipFromFeed(CoinFlipFeedsQueryKeys.user(), flipId);
    removeFlipFromFeed(CoinFlipFeedsQueryKeys.userPending(), flipId);
};

const handleFlipPush = (flip: FlipExecutedGetDto, userId: string, skipPending = false) => {
    pushFlipToFeed(CoinFlipFeedsQueryKeys.global(), flip);
    pushFlipToFeed(CoinFlipFeedsQueryKeys.guild(flip.guildId), flip);

    if (flip.userId === userId) {
        pushFlipToFeed(CoinFlipFeedsQueryKeys.user(), flip);
    }

    if (flip.userId === userId && !skipPending) {
        if (flip.pending) {
            pushFlipToFeed(CoinFlipFeedsQueryKeys.userPending(), flip);
        } else {
            const wasUserPendingFlip = removeFlipFromFeed(CoinFlipFeedsQueryKeys.userPending(), flip.id);
            if (wasUserPendingFlip) {
                pushFlipToFeed(CoinFlipFeedsQueryKeys.userExecutedFlips(), flip);
                grantExpFromFlip(flip);
            }
        }
    }
};

const removeFlipFromFeed = (queryKey: QueryKey, flipId: string) => {
    let removed = false;

    queryClient.setQueryData<FlipExecutedGetDto[]>(queryKey, (prev) => {
        const result = prev ? prev.filter((f) => f.id !== flipId) : [];
        removed = result.length < (prev?.length ?? 0);
        return result;
    });

    return removed;
};

const pushFlipToFeed = (queryKey: QueryKey, flip: FlipExecutedGetDto) => {
    queryClient.setQueryData<FlipExecutedGetDto[]>(queryKey, (prev) => {
        const previousFlips = prev ?? [];
        if (previousFlips.some((f) => f.id === flip.id)) {
            return previousFlips.map((f) => (f.id === flip.id ? flip : f));
        } else {
            return [flip, ...previousFlips].sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_FEED_SIZE);
        }
    });
};

const grantExpFromFlip = (flip: FlipExecutedGetDto) => {
    queryClient.setQueryData<FlipProfileGetDto>(FlipProfileQueryKeys.me(), (profile) => {
        if (profile) {
            const newExperience = { ...profile.experience, flipping: profile.experience.flipping + flip.exp };
            return { ...profile, experience: newExperience };
        }
    });
};
