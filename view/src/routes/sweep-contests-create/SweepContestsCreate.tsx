import { MarketplaceName } from '@flipguard/domain';
import {
    MAX_SWEEP_CONTEST_DURATION,
    Permission,
    SweepContestCollection,
    SweepContestCreateDto,
    SweepContestSettings,
    SweepContestType,
    WinnerGroup,
} from '@flipguard/webapp-api';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useSweepContestCreateMutation } from '../../api/mutations/sweep-contests';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { SweepContestEditor } from '../../components/organisms/sweep-contests/SweepContestEditor';
import { RoutePath } from '../../config/constants/navigation';
import { useTeamContext } from '../../contexts/team-context';
import { useAuth } from '../../hooks/use-auth';
import isViewMobile from '../../hooks/utils/isViewMobile';

const INITIAL_SETTINGS: SweepContestSettings = {
    public: false,
    sweepAndHold: false,
    wallets: {},
    sales: {},
};

export const SweepContestsCreate = () => {
    const { user } = useAuth();
    const { scopedTeam } = useTeamContext();
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const createSweepContestMutation = useSweepContestCreateMutation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [collections, setCollections] = useState<SweepContestCollection[]>([]);
    const [startTime, setStartTime] = useState(Date.now() + 24 * 3600);
    const [endTime, setEndTime] = useState(startTime + 7 * 24 * 3600);
    const [type, setType] = useState<SweepContestType>(SweepContestType.QUANTITY);
    const [settings, setSettings] = useState<SweepContestSettings>(INITIAL_SETTINGS);
    const [winnerGroups, setWinnerGroups] = useState<WinnerGroup[]>([]);
    const [entriesPerCollection, setEntriesPerCollection] = useState<Record<string, number>>({});
    const [marketplaceRestrictions, setMarketplaceRestrictions] = useState<MarketplaceName[] | undefined>(undefined);

    const onCreate = () => {
        const dto: SweepContestCreateDto = {
            name: name.trim(),
            teamId: scopedTeam?.id,
            description: description,
            collections: collections,
            startTime: startTime,
            endTime: endTime,
            type: type,
            settings: settings,
            config: {
                winnerGroups: winnerGroups,
                entriesPerCollection: type === SweepContestType.QUANTITY ? entriesPerCollection : undefined,
            },
            marketplaceRestrictions: marketplaceRestrictions,
        } as SweepContestCreateDto;

        createSweepContestMutation.mutate(dto, {
            onSuccess: () => {
                setLocation(RoutePath.SweepContests);
            },
        });
    };

    const endTimeError = (() => {
        if (endTime <= startTime) {
            return 'Invalid end time';
        } else if (endTime - startTime > MAX_SWEEP_CONTEST_DURATION) {
            return 'Sweep contest cannot run for more than 1 month';
        } else {
            return undefined;
        }
    })();

    const [saveDisabled, tooltipMsg] = (() => {
        if (!name) {
            return [true, 'Sweep contest name cannot be blank'];
        } else if (endTimeError !== undefined) {
            return [true, undefined];
        } else if (collections.length === 0) {
            return [true, 'You have to add at least one collection'];
        } else if (collections.some(({ address }) => !ethers.utils.isAddress(address.toLowerCase()))) {
            return [true, 'Invalid address in one more collections'];
        } else if (winnerGroups.length === 0) {
            return [true, 'You have to add at least one winner group'];
        } else if (!user.hasOneOfPermissions(Permission.ADMIN, Permission.SWEEP_CONTESTS)) {
            return [true, 'You need an active sweep contests module to run sweep contests'];
        } else if (marketplaceRestrictions && marketplaceRestrictions.length === 0) {
            return [true, 'You need to choose at least one marketplace to run a sweep contest on'];
        } else {
            return [false, undefined];
        }
    })();

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px 8px 16px',
                marginTop: isMobile ? '0px' : '16px',
            }}
        >
            <HeaderBox sx={{ marginTop: 0, marginBottom: 0 }}>
                <CleaningServicesOutlinedIcon />
                <HeaderText>Create Sweep Contest</HeaderText>
                <Typography sx={{ flexGrow: 1 }} />
                <FadingTooltip title={'Open sweep contests setup guide'} placement={'top'}>
                    <HelpOutlineIcon
                        onClick={() =>
                            window.open(
                                'https://wiki.flipguard.xyz/flipguard-wiki-wip/user-guides/sweep-contests',
                                '_blank',
                            )
                        }
                        sx={{ color: '#81807f', '&:hover': { color: '#fff', cursor: 'pointer' } }}
                    />
                </FadingTooltip>
            </HeaderBox>
            <SweepContestEditor
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                collections={collections}
                setCollections={setCollections}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                type={type}
                setType={setType}
                settings={settings}
                setSettings={setSettings}
                winnerGroups={winnerGroups}
                setWinnerGroups={setWinnerGroups}
                entriesPerCollection={entriesPerCollection}
                setEntriesPerCollection={setEntriesPerCollection}
                marketplaceRestrictions={marketplaceRestrictions}
                setMarketplaceRestrictions={setMarketplaceRestrictions}
            />
            <Box
                sx={{
                    display: 'flex',
                    margin: '8px',
                    marginTop: '16px',
                }}
            >
                <TertiaryButton icon={WestOutlinedIcon} onClick={() => setLocation(RoutePath.SweepContests)}>
                    Cancel
                </TertiaryButton>
                <Typography sx={{ flexGrow: 1 }} />
                <PrimaryButton
                    disabled={saveDisabled}
                    disableOnNoAuth={true}
                    loading={createSweepContestMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onCreate}
                    tooltipMessage={tooltipMsg}
                >
                    Create
                </PrimaryButton>
            </Box>
        </Card>
    );
};
