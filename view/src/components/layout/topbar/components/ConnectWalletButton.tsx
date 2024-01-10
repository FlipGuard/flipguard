import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import { Box, BoxProps, Button, Typography } from '@mui/material';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

export const ConnectWalletButton = (props: BoxProps) => {
    const { address, isConnected } = useAccount();
    const { open } = useWeb3Modal();

    const formattedAddress = address ? address.substring(0, 6) + '...' + address.substring(address.length - 6) : '';

    return (
        <Box {...props}>
            <Button
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    borderRadius: '6px',
                    padding: '6px 16px',
                    background: '#333333dd',
                    transition: 'none',
                    textTransform: 'none',
                    '&:hover': {
                        background: '#333333',
                    },
                }}
                onClick={() => open()}
                disableRipple
            >
                <WalletOutlinedIcon sx={{ color: '#fff', marginRight: '10px' }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 300, color: '#fff' }}>
                    {isConnected ? formattedAddress : 'Connect wallet'}
                </Typography>
            </Button>
        </Box>
    );
};
