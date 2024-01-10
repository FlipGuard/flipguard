import { Box, Grid } from '@mui/material';
import { Redirect } from 'wouter';

import { DelayedCircularProgress } from '../../../../components/layout/utils/DelayedCircularProgress';
import { RoutePath } from '../../../../config/constants/navigation';
import { useFlipBotContext } from '../../../../contexts/flipbot-context';
import { TokenGatingErc20Tab } from './tabs/TokenGatingErc20Tab';

export const FlipBotTokenGatingModuleRoute = () => {
    const { scopedConfig, isLoading } = useFlipBotContext();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <DelayedCircularProgress sx={{ color: '#fff' }} />
            </Box>
        );
    }

    if (!scopedConfig) {
        return <Redirect to={RoutePath.FlipBot} />;
    }

    const tokenGatingConfig = scopedConfig.modules.tokenGating;

    return (
        <>
            <Grid item xs={12} md={12} lg={10} xl={10}>
                <TokenGatingErc20Tab configId={scopedConfig.id} config={tokenGatingConfig} />
            </Grid>
        </>
    );
};
