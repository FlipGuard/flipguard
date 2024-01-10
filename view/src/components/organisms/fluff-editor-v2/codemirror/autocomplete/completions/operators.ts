import { Completion, snippetCompletion } from '@codemirror/autocomplete';

export type Operator = '<' | '<=' | '!=' | '==' | '>=' | '>' | 'in' | 'not in' | '+' | '-' | '*' | '/' | 'and' | 'or';

export const MATH_OPERATORS: Operator[] = ['+', '-', '*', '/'];
export const COMPARISON_OPERATORS: Operator[] = ['<', '<=', '!=', '==', '>=', '>', 'in', 'not in'];
export const LOGICAL_OPERATORS: Operator[] = ['and', 'or'];

export const OPERATOR_COMPLETIONS: Record<Operator, Completion> = {
    ['+']: { label: '+', apply: '+ ', type: 'operator' },
    ['-']: { label: '-', apply: '- ', type: 'operator' },
    ['*']: { label: '*', apply: '* ', type: 'operator' },
    ['/']: { label: '/', apply: '/ ', type: 'operator' },
    ['and']: { label: 'and', apply: 'and ', boost: 10 },
    ['or']: { label: 'or', apply: 'or ', boost: 10 },
    ['<']: snippetCompletion('< ${}', { label: '<', type: 'operator', boost: 8 }),
    ['<=']: snippetCompletion('<= ${}', { label: '<=', type: 'operator', boost: 7 }),
    ['!=']: snippetCompletion('!= ${}', { label: '!=', type: 'operator', boost: 6 }),
    ['==']: snippetCompletion('== ${}', { label: '==', type: 'operator', boost: 5 }),
    ['>=']: snippetCompletion('>= ${}', { label: '>=', type: 'operator', boost: 4 }),
    ['>']: snippetCompletion('> ${}', { label: '>', type: 'operator', boost: 3 }),
    ['in']: snippetCompletion('in [${}]', { label: 'in', type: 'operator', boost: 2 }),
    ['not in']: snippetCompletion('not in [${}]', { label: 'not in', type: 'operator', boost: 1 }),
};

export const MATH_OPERATOR_COMPLETIONS = (Object.keys(OPERATOR_COMPLETIONS) as Operator[])
    .filter((op) => MATH_OPERATORS.includes(op))
    .map((op) => OPERATOR_COMPLETIONS[op]);

export const LOGICAL_OPERATOR_COMPLETIONS = (Object.keys(OPERATOR_COMPLETIONS) as Operator[])
    .filter((op) => LOGICAL_OPERATORS.includes(op))
    .map((op) => OPERATOR_COMPLETIONS[op]);
