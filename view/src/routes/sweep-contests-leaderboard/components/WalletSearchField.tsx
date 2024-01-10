import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment, TextFieldProps } from '@mui/material';

import { CustomTextField } from '../../../components/atoms/inputs/text-field/CustomTextField';

export const WalletSearchField = (props: TextFieldProps) => {
    return (
        <CustomTextField
            sx={{ width: '100%', '& .MuiInputBase-root': { borderRadius: '6px' } }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchOutlinedIcon sx={{ color: '#666' }} />
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};
