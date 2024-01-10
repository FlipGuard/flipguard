import { getMarketplaceInfo, MarketplaceChain, MarketplaceName } from '@flipguard/domain';
import { Box, styled } from '@mui/material';

import { FadingTooltip } from '../../atoms/feedback/tooltip/FadingTooltip';

const Container = styled(Box)({
    display: 'flex',
    gap: '4px',
    '& img:hover': {
        cursor: 'pointer',
    },
});

type Props = {
    marketplaces: MarketplaceName[];
    chain: MarketplaceChain;
};

export const SupportedMarketplaces = ({ marketplaces, chain }: Props) => {
    return (
        <Container>
            {[...marketplaces]
                .sort((a, b) => a.localeCompare(b))
                .map((name) => getMarketplaceInfo({ name, chain }))
                .map(({ iconUrl, name, url }, idx) => (
                    <FadingTooltip key={idx} title={name}>
                        <img
                            onClick={() => window.open(url, '_blank')}
                            src={iconUrl}
                            alt={''}
                            width={24}
                            height={24}
                            style={{ borderRadius: '50%', boxShadow: '0px 0px 1px 1px #333' }}
                        />
                    </FadingTooltip>
                ))}
        </Container>
    );
};
