import { isId } from '@flipguard/webapp-api';

import { useAuth } from '../use-auth';

export const validateExtension = (extensionId: string) => {
    const { user } = useAuth();

    if (!isId(extensionId)) {
        return 'ID can only contain alphanumeric characters, spaces and hyphens';
    }

    if (user.metadata.extensions.find((e) => e.id === extensionId) !== undefined) {
        return 'Extension with this ID already exists';
    }

    return '';
};
