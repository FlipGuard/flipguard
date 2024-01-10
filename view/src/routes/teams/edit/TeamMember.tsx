import { Box } from '@mui/material';

import { TertiaryButton } from '../../../components/atoms/inputs/button/TertiaryButton';
import { UserAvatar } from '../../../components/molecules/users/UserAvatar';

type Props = {
    userId: string;
    onDelete: () => void;
    removable?: boolean;
};

export const TeamMember = ({ userId, onDelete, removable }: Props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <UserAvatar sx={{ maxWidth: '60%' }} userId={userId} withUsername={true} />
            <TertiaryButton onClick={onDelete} disabled={!removable}>
                Remove
            </TertiaryButton>
        </Box>
    );
};
