import { Completion, snippetCompletion } from '@codemirror/autocomplete';
import { NftEventType } from '@flipguard/domain';
import { NFT_EVENT_VARIABLES } from '@flipguard/webapp-api';

import { COMPARISON_OPERATORS, MATH_OPERATORS, Operator } from './operators';

type VariableValueType = 'string' | 'record' | 'any';

export type VariableCompletion = Completion & {
    regex?: RegExp;
    possibleOperators: Operator[];
    possibleValues: string[];
    valueType: VariableValueType;
    requiredTriggers: NftEventType[];
};

export class VariableCompletions {
    private readonly completions: VariableCompletion[];

    private constructor(completions: VariableCompletion[]) {
        this.completions = completions;
    }

    public static init = (): VariableCompletions => {
        const fluffVariables = NFT_EVENT_VARIABLES.filter((v) => v.fluffName !== undefined);
        const completions: VariableCompletion[] = fluffVariables.map((v) => {
            const fluffName = v.fluffName as string;
            const isString = v.valueType === 'string';

            const completion: VariableCompletion = {
                label: fluffName,
                apply: fluffName + ' ',
                info: v.description,
                type: 'variable',
                valueType: isString ? 'string' : 'any',
                possibleOperators: isString
                    ? ['!=', '==', 'in', 'not in']
                    : [...MATH_OPERATORS, ...COMPARISON_OPERATORS],
                possibleValues: v.possibleValues ?? [],
                requiredTriggers: v.requiredEventTypes ?? [],
            };

            if (v.valueType === 'record') {
                return {
                    ...completion,
                    valueType: 'record',
                    ...snippetCompletion(completion.label + '["${key}"] ', {
                        label: completion.label,
                    }),
                    regex: new RegExp(VariableCompletions.escapeRegexChars(completion.label) + '\\[".*"]'),
                };
            }

            return completion;
        });

        return new VariableCompletions(completions);
    };

    public static initForTrigger = (trigger: NftEventType): VariableCompletions => {
        const { completions } = VariableCompletions.init();
        return new VariableCompletions(
            completions.filter((c) => c.requiredTriggers.length === 0 || c.requiredTriggers.includes(trigger)),
        );
    };

    private static escapeRegexChars = (lexeme: string) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        return lexeme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    public getByName = (name: string): VariableCompletion | undefined => {
        const variable = this.completions.find((c) => c.label === name);
        return variable ? variable : this.completions.find((c) => c.regex && name.match(c.regex));
    };

    public getByNameForTriggers = (name: string, triggers: NftEventType[]): VariableCompletion | undefined => {
        const variable = this.getForTriggers(triggers).find((c) => c.label === name);
        return variable ? variable : this.completions.find((c) => c.regex && name.match(c.regex));
    };

    public getForTriggers = (triggers: NftEventType[]) => {
        return this.completions.filter(
            (v) => v.requiredTriggers.length === 0 || triggers.every((t) => v.requiredTriggers.includes(t)),
        );
    };

    public getConstantCompletions = (names: string[]): VariableCompletion[] => {
        return names.map((name) => ({
            label: name,
            apply: name + ' ',
            type: 'variable',
            valueType: 'any',
            possibleOperators: [...COMPARISON_OPERATORS],
            possibleValues: [],
            requiredTriggers: [],
        }));
    };
}
