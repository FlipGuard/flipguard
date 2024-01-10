import { Avatar, AvatarProps, styled } from '@mui/material';
import React from 'react';

const StyledAvatar = styled(Avatar, {
    shouldForwardProp: (prop) => prop !== 'hasIcon',
})<AvatarProps & { hasIcon: boolean }>(({ hasIcon }) => ({
    background: hasIcon ? 'transparent' : '#444',
}));

type Props = AvatarProps & {
    guildId: string;
    icon?: string;
};

export const DiscordServerIcon = ({ guildId, icon, ...props }: Props) => {
    const avatarUrl = icon?.startsWith('http') ? icon : `https://cdn.discordapp.com/icons/${guildId}/${icon}`;
    return <StyledAvatar hasIcon={!!icon} src={avatarUrl} alt={''} {...props} />;
};
