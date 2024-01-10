import { FlipProfileBadgeType } from '@flipguard/webapp-api';
import { Avatar, Box, BoxProps, styled } from '@mui/material';
import { ReactElement } from 'react';

import BadgeCreamcatOgUrl from '../../../assets/badges/badge-creamcat-og.png';
import BadgeFlipwalletHolderUrl from '../../../assets/badges/badge-flipwallet-holder.png';
import BadgeFounderUrl from '../../../assets/badges/badge-founder.png';
import BadgePremiumUrl from '../../../assets/badges/badge-premium.png';
import BadgeVipUrl from '../../../assets/badges/badge-vip.png';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';

const GradientBg = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'mainColor' && prop !== 'secondaryColor',
})<BoxProps & { mainColor: string; secondaryColor?: string }>(({ mainColor, secondaryColor = '#2d3436' }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondaryColor,
    backgroundImage: `linear-gradient(315deg, ${secondaryColor} 0%, ${mainColor} 74%)`,
    width: '32px',
    height: '32px',
    '&:hover': { cursor: 'default' },
}));

export const BADGE_ICON_URLS: Record<FlipProfileBadgeType, string | ReactElement> = {
    [FlipProfileBadgeType.FOUNDER]: BadgeFounderUrl,
    [FlipProfileBadgeType.FLIPWALLET_HOLDER]: BadgeFlipwalletHolderUrl,
    [FlipProfileBadgeType.VIP]: BadgeVipUrl,
    [FlipProfileBadgeType.PREMIUM]: BadgePremiumUrl,
    [FlipProfileBadgeType.CREAMCAT_OG]: (
        <GradientBg mainColor={'#dabb80'} secondaryColor={'#dabb80'}>
            <img src={BadgeCreamcatOgUrl} alt={''} width={32} height={32} />
        </GradientBg>
    ),
};

const CUSTOM_TITLES: Record<string, string> = {
    [FlipProfileBadgeType.FLIPWALLET_HOLDER]: 'FlipGuard Domain Holder',
};

const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '4px',
    overflow: 'hidden',
    borderRadius: '50%',
});

type Props = BoxProps & {
    type: FlipProfileBadgeType;
};

export const FlipProfileBadge = ({ type, ...props }: Props) => {
    return (
        <Container {...props}>
            <FadingTooltip title={CUSTOM_TITLES[type] ?? type} placement={'top'}>
                {typeof BADGE_ICON_URLS[type] === 'string' ? (
                    <Avatar src={BADGE_ICON_URLS[type] as string} alt={type} sx={{ width: '32px', height: '32px' }} />
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {BADGE_ICON_URLS[type] as ReactElement}
                    </Box>
                )}
            </FadingTooltip>
        </Container>
    );
};
