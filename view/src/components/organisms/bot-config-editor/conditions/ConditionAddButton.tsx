import { BoxProps } from '@mui/material';

import { AddElementButton } from '../../../atoms/inputs/button/AddElementButton';

type Props = BoxProps & {
    onClick: () => void;
};

export const ConditionAddButton = ({ onClick, ...boxProps }: Props) => {
    return <AddElementButton onClick={onClick} disabled={false} {...boxProps} />;
};
