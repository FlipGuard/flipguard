import { Completion, snippetCompletion } from '@codemirror/autocomplete';
import { NftEventType } from '@flipguard/domain';
import {
    ActionType,
    IntegrationMetadata,
    IntegrationType,
    MessageTemplateMetadata,
    MessageTemplateType,
    Permission,
} from '@flipguard/webapp-api';

export type ParamCompletion = Completion & {
    possibleValuesFor: (trigger: NftEventType) => string[];
    predicate?: (v: string) => [boolean, string];
    optional?: boolean;
    userInputValueType?: 'string' | 'number';
    constantAllowed?: boolean;
};

export type ActionCompletion = Completion & {
    template: string;
    params: ParamCompletion[];
    triggers: NftEventType[];
    requiredPermissions: Permission[];
};

type Config = {
    integrations: IntegrationMetadata[];
    templates: MessageTemplateMetadata[];
};

export class ActionCompletions {
    private readonly completions: ActionCompletion[];

    private constructor(completions: ActionCompletion[]) {
        this.completions = completions;
    }

    public static init = ({ integrations, templates }: Config): ActionCompletions => {
        return new ActionCompletions([
            {
                template: `${ActionType.DISCORD_WEBHOOK.fluffName}({\n\twebhook: "\${}",\n\ttemplate: "\${}"\n})`,
                ...snippetCompletion(
                    `${ActionType.DISCORD_WEBHOOK.fluffName}({\n\twebhook: "\${}",\n\ttemplate: "\${}"\n})`,
                    {
                        label: ActionType.DISCORD_WEBHOOK.fluffName,
                        info: 'Send a discord message using webhook',
                        type: 'function',
                    },
                ),
                params: [
                    {
                        ...snippetCompletion('webhook: "${}"', {
                            label: 'webhook',
                            info: 'Discord webhook integration ID',
                            type: 'keyword',
                        }),
                        possibleValuesFor: () => {
                            return integrations
                                .filter((s) => s.type === IntegrationType.DISCORD_WEBHOOK)
                                .map((s) => s.id);
                        },
                        predicate: (v) => {
                            if (v.startsWith('"https://discord.com/api/webhooks/')) {
                                return [true, ''];
                            } else {
                                return [false, 'a Discord webhook link'];
                            }
                        },
                        constantAllowed: true,
                    },
                    {
                        ...snippetCompletion('template: "${}"', {
                            label: 'template',
                            info: 'Discord embed message template ID',
                            type: 'keyword',
                        }),
                        possibleValuesFor: (requiredEventType) => {
                            return templates
                                .filter((t) => t.eventType === requiredEventType)
                                .filter((t) => t.messageType === MessageTemplateType.DISCORD_EMBED)
                                .map((t) => t.id);
                        },
                    },
                ],
                triggers: [NftEventType.Listing, NftEventType.Sale, NftEventType.AutobuySale],
                requiredPermissions: [],
            },
            {
                template: `${ActionType.TWITTER_TWEET.fluffName}({\n\tbot: "\${}",\n\ttemplate: "\${}"\n})`,
                ...snippetCompletion(
                    `${ActionType.TWITTER_TWEET.fluffName}({\n\tbot: "\${}",\n\ttemplate: "\${}"\n})`,
                    {
                        label: ActionType.TWITTER_TWEET.fluffName,
                        info: 'Send a tweet using Twitter bot',
                        type: 'function',
                    },
                ),
                params: [
                    {
                        ...snippetCompletion('bot: "${}"', {
                            label: 'bot',
                            info: 'Twitter bot integration ID',
                            type: 'keyword',
                        }),
                        possibleValuesFor: () => {
                            return integrations.filter((s) => s.type === IntegrationType.TWITTER_BOT).map((s) => s.id);
                        },
                    },
                    {
                        ...snippetCompletion('template: "${}"', {
                            label: 'template',
                            info: 'Tweet message template ID',
                            type: 'keyword',
                        }),
                        possibleValuesFor: (requiredEventType) => {
                            return templates
                                .filter((t) => t.eventType === requiredEventType)
                                .filter((t) => t.messageType === MessageTemplateType.TWITTER_TWEET)
                                .map((t) => t.id);
                        },
                    },
                ],
                triggers: [NftEventType.Listing, NftEventType.Sale, NftEventType.AutobuySale],
                requiredPermissions: [],
            },
            {
                template: `${ActionType.AUTOBUY.fluffName}({\n\tvia: "\${}"\n})`,
                ...snippetCompletion(`${ActionType.AUTOBUY.fluffName}({\n\tvia: "\${}"\n})`, {
                    label: ActionType.AUTOBUY.fluffName,
                    info: 'Snipe the NFT',
                    type: 'function',
                }),
                params: [
                    {
                        ...snippetCompletion('via: "${}"', {
                            label: 'via',
                            info: 'Burner to buy the NFT from',
                            type: 'keyword',
                        }),
                        possibleValuesFor: () => {
                            return integrations
                                .filter((s) => s.type === IntegrationType.BURNER_WALLET)
                                .map((s) => s.id);
                        },
                    },
                    {
                        ...snippetCompletion('tx_fee: ${}', {
                            label: 'tx_fee',
                            info: 'Additional transaction fee',
                            type: 'keyword',
                        }),
                        optional: true,
                        possibleValuesFor: () => [],
                        userInputValueType: 'number',
                        constantAllowed: true,
                    },
                    {
                        ...snippetCompletion('gas_multiplier: ${}', {
                            label: 'gas_multiplier',
                            info: 'Gas multiplier',
                            type: 'keyword',
                        }),
                        optional: true,
                        possibleValuesFor: () => [],
                        userInputValueType: 'number',
                        constantAllowed: true,
                    },
                    {
                        ...snippetCompletion('transfer_to: "${}"', {
                            label: 'transfer_to',
                            info: 'Wallet to transfer the NFT after the purchase to',
                            type: 'keyword',
                        }),
                        optional: true,
                        possibleValuesFor: () => [],
                        userInputValueType: 'string',
                        constantAllowed: true,
                    },
                ],
                triggers: [NftEventType.Listing],
                requiredPermissions: [Permission.ADMIN, Permission.SNIPING],
            },
            {
                template: `${ActionType.WEBHOOK_SEND.fluffName}({\n\tid: "\${}"\n})`,
                ...snippetCompletion(`${ActionType.WEBHOOK_SEND.fluffName}({\n\tid: "\${}"\n})`, {
                    label: ActionType.WEBHOOK_SEND.fluffName,
                    info: 'Send events to your custom webhook',
                    type: 'function',
                }),
                params: [
                    {
                        ...snippetCompletion('id: "${}"', {
                            label: 'id',
                            info: 'Custom webhook integration ID',
                            type: 'keyword',
                        }),
                        possibleValuesFor: () => {
                            return integrations.filter((s) => s.type === IntegrationType.WEBHOOK).map((s) => s.id);
                        },
                    },
                ],
                triggers: [NftEventType.Listing, NftEventType.Sale],
                requiredPermissions: [Permission.ADMIN, Permission.DEVELOPER],
            },
        ]);
    };

    public forTrigger = (trigger: NftEventType): ActionCompletions => {
        return new ActionCompletions(this.completions.filter((c) => c.triggers.includes(trigger)));
    };

    public forPermissions = (permissions: Permission[]): ActionCompletions => {
        return new ActionCompletions(
            this.completions.filter((c) => this.isPermissioned(permissions, c.requiredPermissions)),
        );
    };

    private isPermissioned = (permissions: Permission[], required: Permission[]) => {
        if (required.length === 0) {
            return true;
        }
        return required.some((r) => permissions.includes(r));
    };

    public getAll = () => {
        return this.completions;
    };

    public getByName = (name: string) => {
        return this.completions.find((c) => c.label === name);
    };

    public getAllParamCompletions = (name: string) => {
        const action = this.getByName(name);
        if (!action) return undefined;
        const paramsOnlyTemplate = this.templateParamsOnly(action.template);
        return snippetCompletion(paramsOnlyTemplate, {
            label: '{...}',
            info: 'Adds required parameters',
        });
    };

    private templateParamsOnly = (template: string) => {
        return template.substring(template.indexOf('(')).replace('({', '{').replace('})', '}');
    };
}
