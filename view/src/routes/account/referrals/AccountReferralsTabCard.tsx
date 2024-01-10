import { Permission, WalletChain } from '@flipguard/webapp-api';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Box, Card, CardProps, styled, Typography } from '@mui/material';
import React from 'react';

import { useGenerateRefCodeMutation } from '../../../api/mutations/users';
import { InfoAlert } from '../../../components/atoms/feedback/alert/InfoAlert';
import { WarningAlert } from '../../../components/atoms/feedback/alert/WarningAlert';
import { PrimaryButton } from '../../../components/atoms/inputs/button/PrimaryButton';
import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { HeaderBox } from '../../../components/atoms/utils/HeaderBox';
import { HeaderText } from '../../../components/atoms/utils/HeaderText';
import { CopyButton } from '../../../components/molecules/utils/CopyButton';
import { InputLikeBox } from '../../../components/molecules/utils/InputLikeBox';
import { useAuth } from '../../../hooks/use-auth';
import { displaySuccessToast } from '../../../utils/toasts';

const StyledCard = styled(Card)({
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 8px',
    paddingBottom: '4px',
});

export const AccountReferralsTabCard = (props: CardProps) => {
    const { user } = useAuth();
    const generateRefCodeMutation = useGenerateRefCodeMutation();

    const onGenerate = () => {
        generateRefCodeMutation.mutate(undefined, {
            onSuccess: () => {
                displaySuccessToast('Referral code generated succesfully');
            },
        });
    };

    const isPartner = user.hasPermission(Permission.PARTNER);

    const referrals = user.referrals;
    const reflink = referrals.referral ? `${location.protocol}//${location.host}?ref=${referrals.referral.code}` : '';
    const hasLinkedWallet = user.getWalletAddress(WalletChain.Polygon) !== '';
    const share = referrals.referral ? referrals.referral.share : 20;

    return (
        <StyledCard {...props}>
            <HeaderBox sx={{ marginTop: 0 }}>
                <PeopleAltOutlinedIcon />
                <HeaderText>Referral program</HeaderText>
            </HeaderBox>
            {!hasLinkedWallet && (
                <WarningAlert sx={{ flexGrow: 1, margin: '8px' }}>
                    You have to link a wallet to your account to get your share payouts
                </WarningAlert>
            )}
            <Box sx={{ margin: '8px' }}>
                <Typography sx={{ marginBottom: '6px', fontSize: '17px' }}>Your reflink</Typography>
                {referrals.referral ? (
                    <InputLikeBox
                        sx={{
                            padding: '4px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ color: '#aaa' }}>{reflink}</Typography>
                        <CopyButton
                            sx={{ '& svg': { fontSize: '18px' }, marginLeft: '6px', marginRight: '-4px' }}
                            valueToCopy={reflink}
                        />
                    </InputLikeBox>
                ) : (
                    <PrimaryButton
                        size={'small'}
                        onClick={onGenerate}
                        loading={generateRefCodeMutation.isLoading}
                        tooltipPlacement={'top'}
                    >
                        Generate
                    </PrimaryButton>
                )}
            </Box>
            {referrals.referral && isPartner && (
                <Box
                    sx={{
                        margin: '8px',
                        marginTop: 0,
                    }}
                >
                    <Typography sx={{ marginBottom: '6px' }}>Remaining uses:</Typography>
                    <Typography sx={{ color: '#aaa', marginBottom: '8px' }}>
                        {referrals.referral.remainingUses}
                    </Typography>
                    <TertiaryButton size={'small'} onClick={onGenerate} loading={generateRefCodeMutation.isLoading}>
                        Regenerate reflink
                    </TertiaryButton>
                </Box>
            )}
            <InfoAlert sx={{ margin: '8px', marginTop: 0 }}>
                {`You will receive a ${share}% commission for every purchase made by someone who used your referral code during their initial purchase`}
            </InfoAlert>
        </StyledCard>
    );
};
