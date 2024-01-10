import { MenuItemProps, TextFieldProps, useMediaQuery, useTheme } from '@mui/material';

import { CustomMenuItem } from '../../navigation/menu/CustomMenuItem';
import { CustomTextField } from '../text-field/CustomTextField';

type Props = TextFieldProps & {
    options: { label: string; value: string }[];
    MenuItemProps?: MenuItemProps;
};

export const CustomSelect = ({ options, MenuItemProps, ...props }: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isMobile) {
        const isFallbackChosen = props.value === '';
        return (
            <CustomTextField {...props} SelectProps={{ native: true }} {...(isFallbackChosen && { label: '' })}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </CustomTextField>
        );
    }

    return (
        <CustomTextField {...props}>
            {options.map((option) => (
                <CustomMenuItem key={option.value} {...MenuItemProps} value={option.value}>
                    {option.label}
                </CustomMenuItem>
            ))}
        </CustomTextField>
    );
};
