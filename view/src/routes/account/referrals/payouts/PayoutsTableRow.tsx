import { bigintToNumber } from '@flipguard/commons';
import { Payout } from '@flipguard/webapp-api';

import { CustomLink } from '../../../../components/atoms/navigation/CustomLink';
import { CustomTableCell, CustomTableRow } from '../../../../components/molecules/table/CustomTable';
import { formatTimeAgo } from '../../../../utils/timestamps';

type Props = {
    payout: Payout;
};

export const PayoutsTableRow = ({ payout }: Props) => {
    const payoutIdShort = payout.id.substring(0, 8);
    const txHashShort = payout.txHash.substring(0, 6) + '...' + payout.txHash.slice(-6);

    const uiAmount = bigintToNumber(BigInt(payout.revenue.amount), payout.revenue.currency.decimals);
    const currency = payout.revenue.currency.symbol;

    return (
        <CustomTableRow>
            <CustomTableCell
                align={'center'}
                sx={{
                    paddingLeft: '16px',
                    textOverflow: 'ellipsis',
                    maxWidth: '256px',
                    overflow: 'hidden',
                }}
            >
                {payoutIdShort}
            </CustomTableCell>
            <CustomTableCell align={'center'}>{`${uiAmount} ${currency}`}</CustomTableCell>
            <CustomTableCell align={'center'}>
                <CustomLink
                    href={`https://polygonscan.com/tx/${payout.txHash}`}
                    target={'_blank'}
                    rel={'noreferrer'}
                    sx={{ marginLeft: '10px' }}
                >
                    {txHashShort}
                </CustomLink>
            </CustomTableCell>
            <CustomTableCell align={'center'}>{formatTimeAgo(payout.createdAt)}</CustomTableCell>
        </CustomTableRow>
    );
};
