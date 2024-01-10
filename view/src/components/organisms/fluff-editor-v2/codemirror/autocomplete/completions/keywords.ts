import { snippetCompletion } from '@codemirror/autocomplete';

export const KEYWORD_COMPLETIONS = {
    use: snippetCompletion('use {${2}} from "${1}"', {
        label: 'use',
        info: 'Use constants from an extension',
        boost: 40,
    }),
    def: snippetCompletion('def ${} = ${}', {
        label: 'def',
        info: 'Define a constant',
        boost: 30,
    }),
    switch: snippetCompletion('switch {\n\tcase ${} => 1\n\tdefault => 0\n}', {
        label: 'switch',
        info: 'Use switch to assign values based on conditions',
        boost: 30,
    }),
    case: snippetCompletion('case ${} => ', {
        label: 'case',
        info: 'Add another condition',
        boost: 30,
    }),
};
