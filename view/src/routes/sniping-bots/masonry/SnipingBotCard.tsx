import { BotGetDto, BurnerWalletIntegration, SnipingSingleCollectionBotWizardConfigModel } from '@flipguard/webapp-api';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Wallet } from 'ethers';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useBotStartMutation, useBotStopMutation } from '../../../api/mutations/tracking-bots';
import { getIntegration, IntegrationQueryKeys } from '../../../api/requests/integrations';
import { FadingTooltip } from '../../../components/atoms/feedback/tooltip/FadingTooltip';
import { LoadingIconButton } from '../../../components/atoms/inputs/button/LoadingIconButton';
import { ActionMenu } from '../../../components/atoms/navigation/menu/ActionMenu';
import { BotConfigTypeChangeDialog } from '../../../components/organisms/trackers/edit/BotConfigTypeChangeDialog';
import { BotDeleteDialog } from '../../../components/organisms/trackers/form/BotDeleteDialog';
import { BotStatusChip } from '../../../components/organisms/trackers/form/BotsStatusChips';
import { PolygonWalletBalanceBox } from '../../../components/organisms/wallets/PolygonWalletBalanceBox';
import { RoutePath } from '../../../config/constants/navigation';
import { useAuth } from '../../../hooks/use-auth';
import { useCollectionName } from '../../../hooks/use-collection-name';
import isViewMobile from '../../../hooks/utils/isViewMobile';
import { formatTimeAgo } from '../../../utils/timestamps';
import { isBotInBrokenState } from '../../../utils/tracking-bots';

type Props = {
    bot: BotGetDto;
};

const SnipingBotCardComponent = ({ bot }: Props) => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const isMobile = isViewMobile('sm');

    const startBotMutation = useBotStartMutation();
    const stopBotMutation = useBotStopMutation();

    const wizardConfig = bot.wizardConfig as SnipingSingleCollectionBotWizardConfigModel;
    const action = wizardConfig.action;

    const { data: burner } = useQuery(
        IntegrationQueryKeys.detail(action.burner),
        () => getIntegration<BurnerWalletIntegration>(action.burner),
        { enabled: action.burner !== '' },
    );

    const collectionName = useCollectionName(wizardConfig.collection);

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [convertDialogOpen, setConvertDialogOpen] = useState<boolean>(false);

    const start = () => {
        startBotMutation.mutate(bot.id);
    };

    const stop = () => {
        stopBotMutation.mutate(bot.id);
    };

    const isInBrokenState = isBotInBrokenState(bot, user);
    const publicAddress = burner ? new Wallet('0x' + burner.value.privateKey).address : '?';
    const formattedAddress =
        burner && isMobile
            ? publicAddress.substring(0, 8) + '...' + publicAddress.substring(publicAddress.length - 8)
            : publicAddress;

    const menuOptions = [
        {
            icon: EditOutlinedIcon,
            name: 'Edit',
            callback: () => setLocation(RoutePath.SnipingBotsEdit + '/' + bot.id),
        },
        {
            icon: SmartToyOutlinedIcon,
            name: 'Convert',
            callback: () => setConvertDialogOpen(true),
            hide: isInBrokenState,
        },
        {
            icon: DeleteOutlineOutlinedIcon,
            name: 'Delete',
            callback: () => setDeleteDialogOpen(true),
        },
    ];

    return (
        <Card>
            <CardContent sx={{ marginTop: '-6px', marginBottom: '-18px', wordBreak: 'break-word' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isInBrokenState && (
                            <FadingTooltip title={'Your bot is in a broken state'} placement={'top'}>
                                <ErrorOutlineOutlinedIcon
                                    sx={{
                                        marginRight: '8px',
                                        marginLeft: '-2px',
                                        color: '#d73434',
                                    }}
                                />
                            </FadingTooltip>
                        )}
                        <Typography variant={'h6'}>{bot.name}</Typography>
                    </Box>
                    <Typography sx={{ flexGrow: 1 }} />
                    <BotStatusChip active={bot.active} />
                </Box>
                <Typography sx={{ fontSize: '13px', color: '#aaa' }} gutterBottom>
                    {`Collection: ${collectionName ?? '?'}`}
                </Typography>
                <Typography sx={{ marginTop: '-6px', fontSize: '13px', color: '#aaa' }} gutterBottom>
                    {`Burner address: ${formattedAddress}`}
                </Typography>
            </CardContent>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#444', margin: '8px 16px' }} />
            <CardMedia
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 16px',
                }}
            >
                <PolygonWalletBalanceBox sx={{ width: '100%' }} address={publicAddress} />
            </CardMedia>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '-4px',
                }}
            >
                <Box sx={{ paddingLeft: '8px' }}>
                    <Typography
                        sx={(theme) => ({ fontSize: '12px', color: theme.palette.tertiaryButton.dark })}
                    >{`Updated ${formatTimeAgo(bot.updatedAt, false)}`}</Typography>
                </Box>
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    divider={<Divider sx={{ margin: '6px 8px' }} orientation="vertical" flexItem />}
                >
                    <Stack direction={'row'} justifyContent={'center'}>
                        <LoadingIconButton
                            onClick={start}
                            disabled={bot.active}
                            loading={!bot.active && startBotMutation.isLoading}
                        >
                            <PlayCircleFilledWhiteOutlinedIcon />
                        </LoadingIconButton>
                        <LoadingIconButton
                            onClick={stop}
                            disabled={!bot.active}
                            loading={bot.active && stopBotMutation.isLoading}
                        >
                            <StopCircleOutlinedIcon />
                        </LoadingIconButton>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'center'}>
                        <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
                            <MoreVertOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardActions>
            <ActionMenu menuAnchor={menuAnchor} onClose={() => setMenuAnchor(null)} actions={menuOptions} />
            <BotDeleteDialog bot={bot} open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} />
            <BotConfigTypeChangeDialog
                bot={bot}
                open={convertDialogOpen}
                handleClose={() => setConvertDialogOpen(false)}
            />
        </Card>
    );
};

export const SnipingBotCard = React.memo(SnipingBotCardComponent, (prev: Props, next: Props) => {
    return equal(prev.bot, next.bot);
});
