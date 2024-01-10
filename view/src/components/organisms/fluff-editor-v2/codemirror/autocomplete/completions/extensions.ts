import { Completion } from '@codemirror/autocomplete';
import { NftEventType } from '@flipguard/domain';
import { BotExtensionMetadata } from '@flipguard/webapp-api';

type ExtensionCompletion = {
    name: string;
    triggers: NftEventType[];
    constants: string[];
    constantsCompletions: Completion[];
};

export class ExtensionCompletions {
    private constructor(private readonly completions: ExtensionCompletion[]) {}

    public static init = (extensions: BotExtensionMetadata[]): ExtensionCompletions => {
        return new ExtensionCompletions(
            extensions.map((ext) => ({
                name: ext.id,
                triggers: ext.triggers,
                constants: ext.constants.map((c) => c.name),
                constantsCompletions: ext.constants.map((c) => ({
                    label: c.name,
                    apply: c.name,
                    info: `Constant ${c.name}`,
                    boost: 20,
                })),
            })),
        );
    };

    public getAll = (trigger: NftEventType) => {
        return this.completions.filter((c) => c.triggers.includes(trigger)).map((c) => c.name);
    };

    public getByName = (name: string, trigger: NftEventType) => {
        return this.completions.find((c) => c.name === name && c.triggers.includes(trigger));
    };
}
