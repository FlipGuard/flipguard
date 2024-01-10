import { Completion, snippetCompletion } from '@codemirror/autocomplete';
import { Permission } from '@flipguard/webapp-api';

export type MetadataCompletion = Completion & {
    possibleValues: string[];
    required: boolean;
};

export class MetadataCompletions {
    private constructor(private readonly completions: MetadataCompletion[]) {}

    public static init = (permissions: Permission[]): MetadataCompletions => {
        const values = ['listing', 'sale'];
        permissions.includes(Permission.ADMIN) && values.push('sale/sniped');
        return new MetadataCompletions([
            {
                ...snippetCompletion('trigger: "${}"', {
                    label: 'trigger:',
                    info: 'Event triggering the bot',
                    boost: 20,
                }),
                possibleValues: values,
                required: true,
            },
        ]);
    };

    public getByName = (name: string): MetadataCompletion | undefined => {
        return this.completions.find((c) => c.label === name);
    };

    public getMissing = (slice: string): MetadataCompletion[] => {
        return this.completions.filter((c) => c.required && !slice.includes(c.label));
    };
}
