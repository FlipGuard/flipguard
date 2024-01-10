import { StartCollectionIndexingDto } from '@flipguard/webapp-api';
import { useMutation } from '@tanstack/react-query';

import { displayErrorToast } from '../../utils/toasts';
import { COLLECTIONS_KEY, indexCollection } from '../requests/collections';

export const useIndexCollectionMutation = () => {
    return useMutation([COLLECTIONS_KEY], (dto: StartCollectionIndexingDto) => indexCollection(dto), {
        onError: (error: Error) => {
            displayErrorToast(error.message);
        },
    });
};
