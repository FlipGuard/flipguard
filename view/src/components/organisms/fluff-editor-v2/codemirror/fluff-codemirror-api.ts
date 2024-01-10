import { CompletionContext } from '@codemirror/autocomplete';
import { Extension } from '@codemirror/state';
import { NftEventType } from '@flipguard/domain';
import { BotExtensionMetadata, IntegrationMetadata, MessageTemplateMetadata, Permission } from '@flipguard/webapp-api';
import { ScanResult } from '@flipguard/webapp-fluff-api';

export type FluffEditorContext = {
    readOnly: boolean;
    templates: MessageTemplateMetadata[];
    integrations: IntegrationMetadata[];
    extensions: BotExtensionMetadata[];
    permissions: Permission[];
    eventTypes: NftEventType[];
};

// Linting

export type LintingFunctionParams = {
    ctx: FluffEditorContext;
    onLint: (scanResult: ScanResult, errorsFound: boolean) => void;
};

export type LintingFunction = (params: LintingFunctionParams) => Extension;

// Autocomplete

export type AutocompleteFunctionParams = {
    ctx: FluffEditorContext;
};

export type AutocompleteFunction = (params: AutocompleteFunctionParams) => (context: CompletionContext) => unknown;
