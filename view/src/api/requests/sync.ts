import { apiClient } from '../http-client';

export const requestSync = async () => {
    await apiClient.post('/sync');
};
