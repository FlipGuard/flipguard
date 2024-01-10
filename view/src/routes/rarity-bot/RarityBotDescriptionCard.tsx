import { Box, Card, Divider, Typography } from '@mui/material';

import { ArrowPoint } from '../../components/atoms/typography/ArrowPoint';

export const RarityBotDescriptionCard = () => {
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
                <ArrowPoint text={'Uses OpenRarity algorithm'} />
                <ArrowPoint text={'Clearly presents well-known rarity levels'} />
                <ArrowPoint text={'Option to set a default collection for each channel'} />
                <ArrowPoint text={'Collection aliasing for ease of use'} />
                <ArrowPoint text={'Free!'} />
                <Divider sx={{ margin: '12px 8px' }} />
                <Typography variant={'h6'} sx={{ margin: '4px 8px' }}>
                    Your collection is not supported yet?
                </Typography>
                <ArrowPoint text={"Reach out to us and we'll add it to the bot in no time"} />
            </Box>
        </Card>
    );
};
