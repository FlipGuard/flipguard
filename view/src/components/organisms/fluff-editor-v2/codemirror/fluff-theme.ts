import { HighlightStyle } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { Theme } from '@mui/material';

export const getFluffTheme = (theme: Theme) => {
    return EditorView.theme(
        {
            '&': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                color: '#f5f5f5',
                outline: 'none !important',
                fontSize: '15px',
                flexGrow: 1,
                width: 0,
            },
            '.cm-content': {
                fontFamily: "'JetBrains Mono', sans-serif",
            },
            '.cm-tooltip ul': {
                scrollbarWidth: 'thin',
                scrollbarColor: `red`,
                '&::-webkit-scrollbar': {
                    width: '0.3em',
                    height: '0.3em',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `#555`,
                },
            },
            '.cm-scroller': {
                scrollbarWidth: 'thin',
                scrollbarColor: `${theme.palette.primaryBorder.main} ${theme.palette.primary.dark}`,
                '&::-webkit-scrollbar': {
                    width: '0.3em',
                    height: '0.3em',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `${theme.palette.primaryBorder.main}`,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: `#3a3a3a`,
                },
            },
            '.cm-gutters': {
                backgroundColor: theme.palette.primary.main,
                color: '#aaa',
                position: 'relative !important',
                fontFamily: "'JetBrains Mono', sans-serif",
            },
            '.cm-activeLine': {
                background: `${theme.palette.secondary.main}07`,
            },
            '.cm-activeLineGutter': {
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
            },
            '.cm-selectionMatch': {
                backgroundColor: 'inherit',
            },
            '&.cm-focused .cm-cursor': {
                borderLeftColor: '#fff',
            },
            '&.cm-focused .cm-selectionBackground, ::selection': {
                backgroundColor: 'rgba(208,208,208,0.08) !important',
            },
            '&.cm-focused .cm-matchingBracket': {
                backgroundColor: 'rgba(208,208,208,0.3)',
            },
        },
        { dark: true },
    );
};

export const getFluffHighlight = (): HighlightStyle => {
    return HighlightStyle.define([
        { tag: tags.string, color: '#c3e88d' },
        { tag: tags.number, color: '#6baeec' },
        { tag: tags.keyword, color: '#d3813f' },
        { tag: tags.variableName, color: '#c0c0c0' },
        { tag: tags.propertyName, color: '#ffc66d' },
        { tag: tags.comment, color: '#808080' },
        { tag: tags.attributeName, color: '#e08dcb' },
        { tag: tags.controlOperator, color: '#fff' },
    ]);
};
