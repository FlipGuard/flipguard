import { FALLBACK_FLIP_PROFILE_MODEL, UserDetails, ZERO_LIMITS } from '@flipguard/webapp-api';

import { FlipProfileQueryKeys, getMyFlipProfile } from '../api/requests/flip-profiles';
import { getUserDetails, UserQueryKeys } from '../api/requests/user';
import { ACCESS_TOKEN_KEY } from '../config/constants/local-storage';
import { useQueryOnce } from './use-query-once';
import { UserDetailsWrapper } from './utils/user-details-wrapper';

const GUEST_USER: UserDetails = {
    id: '',
    deactivatedAt: -1,
    display: {
        username: '',
        avatar: '',
    },
    permissions: [],
    wallets: {
        polygon: {
            address: '',
        },
    },
    metadata: {
        integrations: [],
        templates: [],
        extensions: [],
        bots: {},
        biddingBots: {},
        sweepContests: {},
        flipBotConfigs: {},
    },
    referrals: {},
    items: [],
    settings: {
        allowTaggingInSnipeMessages: false,
    },
    limits: ZERO_LIMITS,
};

type Props = {
    forceLogin?: boolean;
};

export const useAuth = ({ forceLogin }: Props = {}) => {
    const searchParams = new URLSearchParams(location.search);
    const isAuthDenied = searchParams.has('denied');
    const hasAccessToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);
    const shouldUserBeLoggedIn = forceLogin || (!isAuthDenied && hasAccessToken);

    const { data: user, isLoading } = useQueryOnce(UserQueryKeys.me(), getUserDetails, {
        retry: false,
        enabled: shouldUserBeLoggedIn,
    });

    const { data: flipProfile } = useQueryOnce(FlipProfileQueryKeys.me(), getMyFlipProfile, {
        enabled: !!user,
    });

    return {
        user: UserDetailsWrapper.wrap(user ?? GUEST_USER),
        flipProfile: flipProfile ?? FALLBACK_FLIP_PROFILE_MODEL,
        authenticated: user !== undefined && !!user.id,
        isSigningIn: shouldUserBeLoggedIn && isLoading,
    };
};
