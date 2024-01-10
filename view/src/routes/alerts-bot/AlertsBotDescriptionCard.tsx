import { Box, Card, Typography } from '@mui/material';

import { ArrowPoint } from '../../components/atoms/typography/ArrowPoint';

export const AlertsBotDescriptionCard = () => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
            }}
        >
            <Box
                sx={{
                    '& p': {
                        fontSize: '16px',
                        color: '#bbb',
                    },
                }}
            >
                <Typography variant={'h6'} sx={{ margin: '4px 8px' }}>
                    Features:
                </Typography>
                <ArrowPoint text={'Notifies you as soon as your NFT is sold'} />
                <ArrowPoint text={'Supports tracking of up to 4 wallets simultaneously'} />
                <ArrowPoint text={'Tracks Dew, Magic Eden, OnePlanet and OpenSea'} />
                <ArrowPoint text={'Notifies you on your successful snipes'} />
                <ArrowPoint text={'Free!'} />
            </Box>
        </Card>
    );
};
