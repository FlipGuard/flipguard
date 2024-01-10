import { Box, Card, CardProps, Divider, styled } from '@mui/material';
import React from 'react';
import { useLocation } from 'wouter';

import { RoutePath } from '../../../config/constants/navigation';
import { CustomTab } from './CustomTab';

const StyledCard = styled(Card)({
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '2px',
    overflow: 'auto hidden',
    maxWidth: 'fit-content',
});

type Props = CardProps & {
    tabs: Record<string, { name: string; path?: RoutePath; withDivider?: boolean; disabled?: boolean }>;
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export const CustomTabsCard = ({ tabs, activeTab, onTabChange, ...props }: Props) => {
    const [, setLocation] = useLocation();

    return (
        <StyledCard {...props}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {Object.entries(tabs).map(([key, { name, path, withDivider, disabled }], idx) => (
                    <React.Fragment key={idx}>
                        <CustomTab
                            onClick={() => {
                                onTabChange(key);
                                path && setLocation(path);
                            }}
                            active={activeTab === key}
                            disabled={disabled}
                            disableRipple
                        >
                            {name}
                        </CustomTab>
                        {withDivider && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Divider sx={{ height: '22px', margin: '0 2px' }} orientation={'vertical'} />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </StyledCard>
    );
};
