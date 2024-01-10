import { isId } from '@flipguard/webapp-api';

import { useAuth } from '../use-auth';

export const validateMessageTemplateId = (templateId: string) => {
    const { user } = useAuth();

    if (!isId(templateId)) {
        return 'ID can only contain alphanumeric characters, spaces and hyphens';
    }

    if (user.metadata.templates.find((t) => t.id === templateId) !== undefined) {
        return 'Template with this ID already exists';
    }

    return '';
};
