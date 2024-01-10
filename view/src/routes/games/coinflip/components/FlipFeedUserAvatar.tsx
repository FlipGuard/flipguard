import React from 'react';

import { UserAvatar } from '../../../../components/molecules/users/UserAvatar';

type Props = {
    userId: string;
    withUsername?: boolean;
};

export const FlipFeedUserAvatar = ({ userId, withUsername }: Props) => {
    return <UserAvatar userId={userId} withUsername={withUsername} withBadge={true} withLevel={true} />;
};
