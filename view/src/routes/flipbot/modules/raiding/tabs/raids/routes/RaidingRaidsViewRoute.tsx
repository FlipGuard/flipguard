import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { Redirect, useLocation } from 'wouter';

import { TertiaryButton } from '../../../../../../../components/atoms/inputs/button/TertiaryButton';
import { CustomTextField } from '../../../../../../../components/atoms/inputs/text-field/CustomTextField';
import { CustomLink } from '../../../../../../../components/atoms/navigation/CustomLink';
import { HeaderBox } from '../../../../../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../../../../../components/atoms/utils/HeaderText';
import { UserAvatar } from '../../../../../../../components/molecules/users/UserAvatar';
import { InputLikeBox } from '../../../../../../../components/molecules/utils/InputLikeBox';
import { NoDataFallback } from '../../../../../../../components/molecules/utils/NoDataFallback';
import { RoutePath } from '../../../../../../../config/constants/navigation';
import { useFlipBotContext } from '../../../../../../../contexts/flipbot-context';
import { formatTimeAgo } from '../../../../../../../utils/timestamps';

type Props = {
    raidId: string;
};

export const RaidingRaidsViewRoute = ({ raidId }: Props) => {
    const [, setLocation] = useLocation();
    const { scopedConfig } = useFlipBotContext();

    if (!scopedConfig) {
        return <Redirect to={RoutePath.FlipBotModuleRaiding} />;
    }

    const raid = scopedConfig.modules.raiding.raids[raidId];
    if (!raid) {
        return <Redirect to={RoutePath.FlipBotModuleRaiding} />;
    }

    return (
        <Grid item xs={12} md={12} lg={10} xl={10}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 16px 8px 16px',
                }}
            >
                <HeaderBox sx={{ marginTop: 0 }}>
                    <RepeatOutlinedIcon />
                    <HeaderText>{`Details of the "${raid.title}" Raid`}</HeaderText>
                </HeaderBox>
                <CustomTextField
                    sx={{ margin: '8px' }}
                    label={'Title'}
                    value={raid.title}
                    onChange={() => {}}
                    disabled={true}
                />
                <CustomTextField
                    sx={{ margin: '12px 8px 8px 8px' }}
                    label={'Description'}
                    value={raid.description}
                    onChange={() => {}}
                    multiline
                    minRows={3}
                    disabled={true}
                />
                <InputLikeBox label={'Tweet'} sx={{ margin: '8px', padding: '8px 14px' }}>
                    <CustomLink sx={{ lineBreak: 'anywhere' }} href={raid.tweetUrl} target={'_blank'}>
                        {raid.tweetUrl}
                    </CustomLink>
                </InputLikeBox>
                <HeaderBox>
                    <PeopleAltOutlinedIcon />
                    <HeaderText>{`Raiders - ${raid.raiders.length}`}</HeaderText>
                </HeaderBox>
                <Box sx={{ margin: '8px', display: 'flex', flexDirection: 'column' }}>
                    {[...raid.raiders]
                        .sort((a, b) => b.raidedAt - a.raidedAt)
                        .map((raider, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingTop: idx === 0 ? 0 : '8px',
                                    paddingBottom: '8px',
                                    borderTop: idx === 0 ? 'none' : '1px solid #333',
                                }}
                            >
                                <UserAvatar sx={{ maxWidth: '50%' }} userId={raider.discordId} withUsername={true} />
                                <Typography>{formatTimeAgo(raider.raidedAt, false)}</Typography>
                            </Box>
                        ))}
                </Box>
                {raid.raiders.length === 0 && (
                    <NoDataFallback sx={{ margin: '0 8px 16px 8px' }} text={'No one raided the above tweet yet'} />
                )}
                <Box
                    sx={{
                        display: 'flex',
                        margin: '8px',
                        marginTop: '16px',
                    }}
                >
                    <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.FlipBotModuleRaiding)}>
                        Cancel
                    </TertiaryButton>
                    <Typography sx={{ flexGrow: 1 }} />
                </Box>
            </Card>
        </Grid>
    );
};
