import { FlipProfileBadgeType } from '@flipguard/webapp-api';
import { Avatar, Box, BoxProps, styled, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { FlipProfileQueryKeys, getFlipProfileAvatarOf } from '../../../api/requests/flip-profiles';
import { RoutePath } from '../../../config/constants/navigation';
import { useQueryOnce } from '../../../hooks/use-query-once';
import { BADGE_ICON_URLS } from '../../../routes/flipprofile/badges/Badge';
import { DiscordAvatar } from '../../atoms/data-display/DiscordAvatar';
import { FadingTooltip } from '../../atoms/feedback/tooltip/FadingTooltip';

const Container = styled(Box)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
});

const BADGES_TO_DISPLAY: FlipProfileBadgeType[] = [
    FlipProfileBadgeType.FOUNDER,
    FlipProfileBadgeType.FLIPWALLET_HOLDER,
    FlipProfileBadgeType.VIP,
    FlipProfileBadgeType.PREMIUM,
];

type Props = BoxProps & {
    userId: string;
    withUsername?: boolean;
    withBadge?: boolean;
    withLevel?: boolean;
    tooltipPrefix?: string;
};

export const UserAvatar = ({ userId, withUsername, withBadge, withLevel, tooltipPrefix, ...props }: Props) => {
    const [, setLocation] = useLocation();

    const { data: displayInfo } = useQueryOnce(FlipProfileQueryKeys.avatar(userId), () =>
        getFlipProfileAvatarOf(userId),
    );

    const badgeToDisplay = displayInfo && BADGES_TO_DISPLAY.find((b) => displayInfo.badges.includes(b));
    const username = displayInfo ? displayInfo.username || userId : userId;
    const level = displayInfo ? displayInfo.level : 1;
    const tooltip = withLevel ? `${username}, lvl. ${level}` : username;

    return (
        <Container {...props}>
            <FadingTooltip title={withUsername ? '' : [tooltipPrefix ?? '', tooltip].join(' ')} placement={'top'}>
                <span>
                    <DiscordAvatar
                        userId={userId}
                        avatar={displayInfo?.avatar ?? ''}
                        onClick={() => setLocation(`${RoutePath.FlipProfile}/${userId}`)}
                        sx={(theme) => ({
                            background: '#999',
                            color: theme.palette.primary.main,
                            fontSize: '22px',
                            width: '28px',
                            height: '28px',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        })}
                    />
                </span>
            </FadingTooltip>
            {withUsername && (
                <Typography
                    sx={{ marginLeft: withBadge ? '16px' : '12px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {username}
                </Typography>
            )}
            {withLevel && (
                <Box sx={{ position: 'absolute', bottom: -6, left: 24 }}>
                    <Typography sx={{ fontSize: '10px' }}>{level}</Typography>
                </Box>
            )}
            {withBadge && badgeToDisplay && (
                <Avatar
                    src={BADGE_ICON_URLS[badgeToDisplay] as string}
                    alt={''}
                    sx={(theme) => ({
                        background: theme.palette.primary.main,
                        position: 'absolute',
                        width: '14px',
                        height: '14px',
                        top: -6,
                        left: 22,
                    })}
                />
            )}
        </Container>
    );
};
