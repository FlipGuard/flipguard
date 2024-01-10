import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
        primaryButton: Palette['primary'];
        tertiaryButton: Palette['primary'];
        errorButton: Palette['primary'];
        primaryBorder: Palette['primary'];
        menuItem: Palette['primary'];
        inputBorder: Palette['primary'];
        inputLabel: Palette['primary'];
        activeInputBorder: Palette['primary'];
        chip: Palette['primary'];
    }

    interface PaletteOptions {
        tertiary: PaletteOptions['primary'];
        primaryButton: PaletteOptions['primary'];
        tertiaryButton: PaletteOptions['primary'];
        errorButton: PaletteOptions['primary'];
        primaryBorder: PaletteOptions['primary'];
        menuItem: PaletteOptions['primary'];
        inputBorder: PaletteOptions['primary'];
        inputLabel: PaletteOptions['primary'];
        activeInputBorder: PaletteOptions['primary'];
        chip: PaletteOptions['primary'];
    }
}
