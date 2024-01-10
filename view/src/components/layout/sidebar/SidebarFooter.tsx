import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, BoxProps, styled, SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

import { DiscordIcon } from '../../atoms/data-display/icons/DiscordIcon';
import { FadingTooltip } from '../../atoms/feedback/tooltip/FadingTooltip';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

const ExternalLinkContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    height: '32px',
    '& svg': {
        color: '#81807f',
    },
    '& button': {
        color: '#81807f',
    },
    '&:hover': {
        cursor: 'pointer',
        '& svg': {
            color: '#fff',
        },
        '& button': {
            color: '#fff',
        },
    },
});

export const SidebarFooter = (props: BoxProps) => {
    return (
        <Container {...props}>
            <ExternalLink name={'Documentation'} link={'https://wiki.flipguard.xyz/'} icon={ArticleOutlinedIcon} />
            <ExternalLink name={'Discord'} link={'https://discord.gg/flipguard'} icon={DiscordIcon} />
            <ExternalLink name={'Twitter'} link={'https://twitter.com/flipguardxyz'} icon={TwitterIcon} />
        </Container>
    );
};

type ExternalLinkProps = {
    name: string;
    icon: ComponentType<SvgIconProps>;
    link: string;
};

const ExternalLink = ({ name, icon, link }: ExternalLinkProps) => {
    const Icon = icon;

    return (
        <ExternalLinkContainer onClick={() => window.open(link, name)}>
            <FadingTooltip title={name} placement={'right'}>
                <span style={{ margin: '0 auto' }}>
                    <Icon sx={{ fontSize: '21px' }} />
                </span>
            </FadingTooltip>
        </ExternalLinkContainer>
    );
};
