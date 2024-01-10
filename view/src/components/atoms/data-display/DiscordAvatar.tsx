import { Avatar, AvatarProps, styled } from '@mui/material';
import React from 'react';

const StyledAvatar = styled(Avatar)({
    background: '#999',
});

type Props = AvatarProps & {
    userId: string;
    avatar: string;
};

export const DiscordAvatar = ({ userId, avatar, ...props }: Props) => {
    const avatarUrl = avatar.startsWith('http') ? avatar : `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;

    return <StyledAvatar src={avatarUrl} alt={''} {...props} />;
};
