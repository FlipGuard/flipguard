import { GenerateGiftCodeDto, GiftCodeModel, OrderItem, RedeemGiftCodeDto } from '@flipguard/webapp-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { displayErrorToast, displaySuccessToast } from '../../utils/toasts';
import { generateGiftCode, GIFT_CODES_KEY, redeemGiftCode } from '../requests/gift-codes';
import { UserQueryKeys } from '../requests/user';

export const useRedeemCodeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation([GIFT_CODES_KEY], (dto: RedeemGiftCodeDto) => redeemGiftCode(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: async (code: GiftCodeModel) => {
            code.items.forEach(({ type }) => {
                const orderItem = OrderItem.forType(type);
                displaySuccessToast(`${orderItem.name} has been claimed! 🔥`);
            });
            await queryClient.invalidateQueries(UserQueryKeys.me());
        },
    });
};

export const useGenerateGiftCodeMutation = () => {
    return useMutation([GIFT_CODES_KEY], (dto: GenerateGiftCodeDto) => generateGiftCode(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
        onSuccess: (code: GiftCodeModel) => {
            displaySuccessToast(`Generated code: ${code.id}`);
        },
    });
};
