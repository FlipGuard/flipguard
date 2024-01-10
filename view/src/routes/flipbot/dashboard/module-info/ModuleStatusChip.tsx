import { Chip, ChipProps, styled } from '@mui/material';

const StyledChip = styled(Chip, {
    shouldForwardProp: (name: string) => name !== 'enabled',
})<ChipProps & { enabled: boolean }>(({ enabled }) => ({
    marginLeft: '-4px',
    borderRadius: '4px',
    height: '18px',
    fontSize: '10px',
    '& span': { padding: '0px 6px' },
    '&:hover': { cursor: 'default' },
    ...(enabled && {
        backgroundColor: '#438f58',
        backgroundImage: 'linear-gradient(315deg, #36804b 0%, #438f58 74%)',
    }),
    ...(!enabled && {
        backgroundColor: '#676767',
        backgroundImage: 'linear-gradient(315deg, #676767 0%, #6f6f6f 74%)',
    }),
}));

type Props = ChipProps & {
    enabled: boolean;
};

export const ModuleStatusChip = ({ enabled, ...props }: Props) => {
    return <StyledChip enabled={enabled} label={enabled ? 'ACTIVE' : 'DISABLED'} {...props} />;
};
