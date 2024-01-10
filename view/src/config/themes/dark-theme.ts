import { createTheme } from '@mui/material';
import Fade from '@mui/material/Fade';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#262626',
            main: '#202020',
            dark: '#181818',
        },
        secondary: {
            main: '#bbe1fa',
            dark: '#99d4fd',
        },
        tertiary: {
            light: '#27aaf3',
            main: '#7acbfc',
            dark: '#4d809d',
        },
        primaryButton: {
            main: '#146d96',
            light: '#16739d',
        },
        tertiaryButton: {
            main: '#444444',
            light: '#464646',
            dark: '#bbb',
        },
        errorButton: {
            main: '#ab3737',
            light: '#b63939',
        },
        primaryBorder: {
            main: '#282828',
            light: '#444',
        },
        menuItem: {
            main: '#383838',
        },
        inputBorder: {
            main: '#444',
            light: '#555',
        },
        inputLabel: {
            main: '#888',
        },
        activeInputBorder: {
            main: '#999',
        },
        chip: {
            main: '#3d3d3d',
            dark: '#363636',
        },
        error: {
            main: '#c44747',
            light: '#e65353',
        },
    },
    typography: {
        fontFamily: "'Readex Pro', sans-serif",
        fontWeightRegular: 300,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                'html, body': {
                    // To prevent Web3Modal from shifting layout on popup
                    scrollbarGutter: 'unset !important',
                },
                body: {
                    // To prevent top-level scroll when user scrolls up while a tooltip is disappearing
                    overflowY: 'hidden',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.primary.main,
                    border: '1px solid #282828',
                    borderRadius: '6px',
                    boxShadow: 'none',
                }),
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    height: '28px',
                },
                icon: {
                    fontSize: '1.2rem',
                },
            },
        },
        MuiIconButton: {
            defaultProps: {
                disableTouchRipple: true,
                size: 'small',
            },
        },
        MuiButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    border: '1px solid #ffffff0f',
                },
            },
            defaultProps: {
                TransitionComponent: Fade,
                transitionDuration: 200,
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    border: '1px solid #ffffff0f',
                    boxShadow: 'none',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '13px',
                    fontWeight: 300,
                    background: '#666',
                },
                arrow: {
                    color: '#666',
                },
            },
        },
        MuiDateTimePicker: {
            defaultProps: {
                viewRenderers: {
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '&:hover': {
                        border: `1px solid ${theme.palette.secondary.dark}`,
                    },
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.secondary.dark + ' !important',
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.dark,
                        },
                    },
                }),
            },
        },
        MuiPickersLayout: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '& .MuiClock-pin': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                    '& .MuiClockPointer-root': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                    '& .MuiClockPointer-thumb': {
                        border: `16px solid ${theme.palette.secondary.dark}`,
                    },
                    '& .MuiClockNumber-root.Mui-selected': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                    '& .MuiDialogActions-root .MuiButton-root': {
                        color: theme.palette.secondary.main,
                    },
                }),
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    background: theme.palette.primary.light,
                }),
            },
        },
    },
});
