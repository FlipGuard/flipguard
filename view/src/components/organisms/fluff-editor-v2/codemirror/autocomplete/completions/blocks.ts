import { snippetCompletion } from '@codemirror/autocomplete';

export const BLOCK_COMPLETIONS = {
    preconditions: snippetCompletion('preconditions:\n\t${}', {
        label: 'preconditions:',
        info: 'Preconditions block',
        boost: 20,
    }),
    if: snippetCompletion('if:\n\t${}', {
        label: 'if:',
        info: 'Condition block',
        boost: 20,
    }),
    then: snippetCompletion('then:\n\t${}', {
        label: 'then:',
        info: 'Actions block',
        boost: 20,
    }),
};
