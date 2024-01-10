import { Box, BoxProps, styled } from '@mui/material';

import { CustomSwitch } from '../../../../components/atoms/inputs/switch/CustomSwitch';

const Container = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
});

type Props = BoxProps & {
    showSuspiciousOnly: boolean;
    setShowSuspiciousOnly: (v: boolean) => void;
};

export const LeaderboardTableFilterRow = ({ showSuspiciousOnly, setShowSuspiciousOnly, ...props }: Props) => {
    return (
        <Container {...props}>
            <CustomSwitch
                label={'Show suspicious wallets only'}
                labelPlacement={'start'}
                checked={showSuspiciousOnly}
                onChange={setShowSuspiciousOnly}
            />
        </Container>
    );
};
