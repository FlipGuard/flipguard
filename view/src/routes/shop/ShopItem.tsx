import { formatBigIntForUi } from '@flipguard/commons';
import { ClaimTrialDto, OrderItem, OrderItemPricing, WalletChain } from '@flipguard/webapp-api';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { Box, Card, CardActions, CardContent, Divider, IconButton, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useAccount } from 'wagmi';

import { useClaimTrialMutation } from '../../api/mutations/orders';
import { InfoAlert } from '../../components/atoms/feedback/alert/InfoAlert';
import { FadingTooltip } from '../../components/atoms/feedback/tooltip/FadingTooltip';
import { PrimaryButton } from '../../components/atoms/inputs/button/PrimaryButton';
import { useAuth } from '../../hooks/use-auth';
import { usePlaceOrder } from '../../hooks/use-place-order';
import { displaySuccessToast } from '../../utils/toasts';
import { PurchaseConfirmationDialog } from './PurchaseConfirmationDialog';

const CONNECT_WALLET_MSG = 'Connect your wallet first';
const OVERLAPPING_MSG = 'You already have this item';

const MAX_OVERLAP_MS = parseInt(import.meta.env.VITE_NONSTACKABLE_ITEMS_MAX_OVERLAP_DAYS) * 24 * 3600 * 1000;

type Props = {
    chain: WalletChain;
    item: OrderItem;
    description: ReactNode;
    setAreOrdersCancellable: (cancellable: boolean) => void;
    isActive: boolean;
    learnMoreText?: string;
    learnMoreLink?: string;
    infoText?: string;
};

export const ShopItem = ({
    chain,
    item,
    description,
    setAreOrdersCancellable,
    isActive,
    learnMoreText,
    learnMoreLink,
    infoText,
}: Props) => {
    const { isConnected } = useAccount();

    const { placeOrder, inProgress: orderingInProgress } = usePlaceOrder();
    const { user } = useAuth();

    const claimTrialMutation = useClaimTrialMutation();

    const [chosenPricing, setChosenPricing] = useState<string>('');
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const isOverlapping = item.isOverlapping(user.details.items, MAX_OVERLAP_MS);
    const buyingDisabled = isOverlapping || !isConnected || claimTrialMutation.isLoading || orderingInProgress;

    const canClaimTrial = item.canTrialBeClaimed(user.details.items);

    const pricings = Object.values(item.pricings[chain]);

    const onBuy = async (refCode?: string) => {
        setAreOrdersCancellable(false);
        setLoading(true);

        placeOrder({
            dto: {
                item: {
                    type: item.type,
                },
                pricing: {
                    chain: chain,
                    id: chosenPricing,
                },
                metadata: {
                    refCode: refCode,
                },
            },
            onFinish: () => {
                setAreOrdersCancellable(true);
                setLoading(false);
            },
        });
    };

    const onTrialClaim = () => {
        const dto: ClaimTrialDto = {
            item: {
                type: item.type,
            },
        };

        claimTrialMutation.mutate(dto, {
            onSuccess: () => {
                displaySuccessToast('Your free trial has been claimed, enjoy! 🔥');
            },
        });
    };

    const formatPricingOption = (pricing: OrderItemPricing) => {
        const uiPrice = formatBigIntForUi(BigInt(pricing.amount), pricing.currency.decimals);
        if (pricing.days > 0) {
            const unit = pricing.days % 31 === 0 ? 'month' : 'day';
            const period = unit === 'month' ? pricing.days / 31 : pricing.days;
            const uiUnit = `${period} ${unit}${period > 1 ? 's' : ''}`;
            return `${uiPrice} ${pricing.currency.symbol}/${uiUnit}`;
        } else {
            return `${uiPrice} ${pricing.currency.symbol}`;
        }
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100%',
                padding: '16px',
                paddingBottom: '20px',
            }}
        >
            <CardContent sx={{ marginBottom: '-12px', wordBreak: 'break-word' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant={'h6'} sx={{ marginRight: '8px' }}>
                        {item.name}
                    </Typography>
                    {learnMoreLink && (
                        <FadingTooltip title={learnMoreText ?? 'Click to learn more'} placement={'top'}>
                            <IconButton onClick={() => window.open(learnMoreLink, '_blank')}>
                                <HelpOutlineOutlinedIcon />
                            </IconButton>
                        </FadingTooltip>
                    )}
                    {!item.stackable && isActive && (
                        <FadingTooltip title={'You already have this item'} placement={'top'}>
                            <CheckCircleOutlineOutlinedIcon
                                sx={{ marginLeft: '4px', fontSize: '25px', color: '#4bd296' }}
                            />
                        </FadingTooltip>
                    )}
                </Box>
            </CardContent>
            <CardContent sx={{ minHeight: '96px' }}>{description}</CardContent>
            <CardActions
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                    marginBottom: '-12px',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {item.trial.available && canClaimTrial && (
                        <PrimaryButton
                            sx={{ width: '100%', marginBottom: '12px' }}
                            size={'small'}
                            onClick={onTrialClaim}
                            loading={loading || showDialog}
                            disableOnNoAuth={true}
                            disabled={buyingDisabled}
                            tooltipMessage={!isConnected ? CONNECT_WALLET_MSG : undefined}
                            tooltipPlacement={'top'}
                        >
                            {`${item.trial.days} days free trial`}
                        </PrimaryButton>
                    )}
                    {pricings.length > 0 ? (
                        <>
                            {pricings.map((pricing, idx) => (
                                <PrimaryButton
                                    key={idx}
                                    sx={{ width: '100%', marginBottom: '12px', textTransform: 'none' }}
                                    size={'small'}
                                    icon={ShoppingCartCheckoutOutlinedIcon}
                                    onClick={() => {
                                        setChosenPricing(pricing.id);
                                        setShowDialog(true);
                                    }}
                                    loading={loading || showDialog || claimTrialMutation.isLoading}
                                    disableOnNoAuth={true}
                                    disabled={buyingDisabled}
                                    tooltipMessage={
                                        isOverlapping ? OVERLAPPING_MSG : !isConnected ? CONNECT_WALLET_MSG : undefined
                                    }
                                    tooltipPlacement={'top'}
                                >
                                    {formatPricingOption(pricing)}
                                </PrimaryButton>
                            ))}
                            {infoText && (
                                <>
                                    <Divider sx={{ marginBottom: '12px' }} />
                                    <InfoAlert>{infoText}</InfoAlert>
                                </>
                            )}
                        </>
                    ) : (
                        <PrimaryButton
                            sx={{ width: '100%', marginBottom: '12px' }}
                            size={'small'}
                            onClick={() => {}}
                            disabled={true}
                        >
                            TBD
                        </PrimaryButton>
                    )}
                </Box>
            </CardActions>
            <PurchaseConfirmationDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={(refCode) => onBuy(refCode)}
            />
        </Card>
    );
};
