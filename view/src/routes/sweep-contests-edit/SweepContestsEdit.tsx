import {
    isQuantitySweepContestGetDto,
    MAX_SWEEP_CONTEST_DURATION,
    SweepContestGetDto,
    SweepContestType,
    SweepContestUpdateDto,
} from '@flipguard/webapp-api';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SaveIcon from '@mui/icons-material/Save';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { Box, Card, Divider, Typography } from '@mui/material';
import { ethers } from 'ethers';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useSweepContestUpdateMutation } from '../../api/mutations/sweep-contests';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../components/atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../components/atoms/utils/HeaderText';
import { InputLikeBox } from '../../components/molecules/utils/InputLikeBox';
import { SweepContestEditor } from '../../components/organisms/sweep-contests/SweepContestEditor';
import { RoutePath } from '../../config/constants/navigation';
import isViewMobile from '../../hooks/utils/isViewMobile';

type Props = {
    originalSweepContest: SweepContestGetDto;
};

export const SweepContestsEdit = ({ originalSweepContest }: Props) => {
    const isMobile = isViewMobile();
    const [, setLocation] = useLocation();

    const updateSweepContestMutation = useSweepContestUpdateMutation();

    const [name, setName] = useState(originalSweepContest.name);
    const [description, setDescription] = useState(originalSweepContest.description);
    const [collections, setCollections] = useState(originalSweepContest.collections);
    const [startTime, setStartTime] = useState(originalSweepContest.startTime);
    const [endTime, setEndTime] = useState(originalSweepContest.endTime);
    const [settings, setSettings] = useState(originalSweepContest.settings);
    const [type, setType] = useState(originalSweepContest.type);
    const [winnerGroups, setWinnerGroups] = useState(originalSweepContest.config.winnerGroups);
    const [entriesPerCollection, setEntriesPerCollection] = useState<Record<string, number>>(
        isQuantitySweepContestGetDto(originalSweepContest)
            ? originalSweepContest.config.entriesPerCollection ?? {}
            : {},
    );
    const [marketplaceRestrictions, setMarketplaceRestrictions] = useState(
        originalSweepContest.marketplaceRestrictions,
    );

    const onUpdate = () => {
        const dto: SweepContestUpdateDto = {
            name: name,
            description: description,
            collections: collections,
            startTime: startTime,
            endTime: endTime,
            settings: settings,
            type: type,
            config: {
                winnerGroups: winnerGroups,
                entriesPerCollection: type === SweepContestType.QUANTITY ? entriesPerCollection : undefined,
            },
            marketplaceRestrictions: marketplaceRestrictions,
        } as SweepContestUpdateDto;

        updateSweepContestMutation.mutate(
            { sweepContestId: originalSweepContest.id, dto },
            {
                onSuccess: () => {
                    setLocation(RoutePath.SweepContests);
                },
            },
        );
    };

    const areConfigsEqual =
        name === originalSweepContest.name &&
        description === originalSweepContest.description &&
        equal(collections, originalSweepContest.collections) &&
        startTime === originalSweepContest.startTime &&
        endTime === originalSweepContest.endTime &&
        equal(settings, originalSweepContest.settings) &&
        equal(marketplaceRestrictions, originalSweepContest.marketplaceRestrictions) &&
        equal(winnerGroups, originalSweepContest.config.winnerGroups) &&
        equal(
            entriesPerCollection,
            isQuantitySweepContestGetDto(originalSweepContest)
                ? originalSweepContest.config.entriesPerCollection ?? {}
                : {},
        );

    const endTimeError = (() => {
        if (endTime <= startTime) {
            return 'Invalid end time';
        } else if (endTime - startTime > MAX_SWEEP_CONTEST_DURATION) {
            return 'Sweep contest cannot run for more than 1 month';
        } else {
            return undefined;
        }
    })();

    const [updateDisabled, tooltipMsg] = (() => {
        if (!name) {
            return [true, 'Sweep contest name cannot be blank'];
        } else if (endTime < Date.now()) {
            return [true, 'You cannot update sweep contest that has already ended'];
        } else if (endTimeError !== undefined) {
            return [true, undefined];
        } else if (collections.length === 0) {
            return [true, 'You have to add at least one collection'];
        } else if (collections.some(({ address }) => !ethers.utils.isAddress(address.toLowerCase()))) {
            return [true, 'Invalid address in one more collections'];
        } else if (winnerGroups.length === 0) {
            return [true, 'You have to add at least one winner group'];
        } else if (marketplaceRestrictions && marketplaceRestrictions.length === 0) {
            return [true, 'You need to choose at least one marketplace to run a sweep contest on'];
        } else if (areConfigsEqual) {
            return [true, undefined];
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
            <HeaderBox sx={{ marginTop: 0 }}>
                <CleaningServicesOutlinedIcon />
                <HeaderText>{`Edit "${originalSweepContest.name}"`}</HeaderText>
            </HeaderBox>
            <InputLikeBox
                label={'Details'}
                sx={{
                    margin: '8px',
                    marginBottom: '2px',
                    padding: '8px 12px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography>ID</Typography>
                    <Typography>{originalSweepContest.id.substring(0, 8)}</Typography>
                </Box>
            </InputLikeBox>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#444', margin: '8px', marginTop: '16px' }} />
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
                disableTypeChange={true}
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
                    disabled={updateDisabled}
                    disableOnNoAuth={true}
                    loading={updateSweepContestMutation.isLoading}
                    loadingPosition={'start'}
                    icon={SaveIcon}
                    onClick={onUpdate}
                    tooltipMessage={tooltipMsg}
                >
                    Update
                </PrimaryButton>
            </Box>
        </Card>
    );
};
