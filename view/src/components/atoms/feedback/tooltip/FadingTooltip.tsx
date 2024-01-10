import { Tooltip, TooltipProps } from '@mui/material';
import Fade from '@mui/material/Fade';

type Props = TooltipProps;

export const FadingTooltip = ({ children, ...restProps }: Props) => {
    return (
        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 200 }} arrow placement={'top'} {...restProps}>
            {children}
        </Tooltip>
    );
};
