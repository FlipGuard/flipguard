import { StartCollectionIndexingDto } from '@flipguard/webapp-api';

import { apiClient } from '../http-client';

export const COLLECTIONS_KEY = 'collections';

export const indexCollection = async (dto: StartCollectionIndexingDto) => {
    await apiClient.post('/collections/index', dto);
};
