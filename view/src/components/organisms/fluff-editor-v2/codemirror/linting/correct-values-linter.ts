import { Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { NftEventType } from '@flipguard/domain';

import { ActionCompletions, ParamCompletion } from '../autocomplete/completions/actions';
import { ExtensionCompletions } from '../autocomplete/completions/extensions';
import { MetadataCompletions } from '../autocomplete/completions/metadata';
import { COMPARISON_OPERATORS, Operator } from '../autocomplete/completions/operators';
import { VariableCompletions } from '../autocomplete/completions/variables';
import { getNodesFromEditorView, LintingNode } from './linting-utils';

export const correctValuesLinter = (config: Config, diagnostics: Diagnostic[]): Result => {
    return new CorrectValuesLinter(config).lint(diagnostics);
};

type Config = {
    view: EditorView;
    triggers: NftEventType[];
    variables: VariableCompletions;
    metadata: MetadataCompletions;
    actions: ActionCompletions;
    extensions: ExtensionCompletions;
};

type Result = {
    constants: string[];
    diagnostics: Diagnostic[];
};

class CorrectValuesLinter {
    private readonly nodes: LintingNode[] = [];
    private readonly variables: VariableCompletions;
    private readonly metadata: MetadataCompletions;
    private readonly actions: ActionCompletions;
    private readonly extensions: ExtensionCompletions;
    private readonly triggers: NftEventType[];
    private current = 0;
    private diagnostics: Diagnostic[] = [];
    private constants: string[] = [];
    private nextConstantToPush?: string;
    private beforeConditions = true;
    private insideImport = false;
    private insideThen = false;
    private constantsToImport: LintingNode[] = [];

    public constructor({ view, triggers, variables, actions, extensions, metadata }: Config) {
        this.nodes = getNodesFromEditorView(view);
        this.variables = variables;
        this.metadata = metadata;
        this.actions = actions;
        this.extensions = extensions;
        this.triggers = triggers;
    }

    public lint = (diagnostics: Diagnostic[]): Result => {
        this.current = 0;
        this.diagnostics = diagnostics;

        while (!this.isAtEnd()) {
            const prev = this.nodes[Math.max(0, this.current - 1)];
            const node = this.advance();
            const next = this.nodes[this.current];
            switch (node.type) {
                case 'keyword':
                    if (node.value === 'use') {
                        this.insideImport = true;
                    } else if (node.value === 'from') {
                        this.insideImport = false;
                        this.extension(this.advance());
                    } else if (['default', 'def'].includes(node.value) && this.nextConstantToPush) {
                        this.constants.push(this.nextConstantToPush);
                        this.nextConstantToPush = undefined;
                    }
                    break;
                case 'variableName':
                    this.variable(prev, node, next);
                    break;
                case 'attributeName':
                    if (prev.value === 'def') {
                        if (this.constants.includes(node.value) || this.nextConstantToPush === node.value) {
                            this.diagnostics.push(
                                diagnosticFrom(node, 'Constant with this name is already defined', 'warning'),
                            );
                        } else if (!this.insideImport) {
                            this.nextConstantToPush = node.value;
                        }
                    } else if (this.insideImport) {
                        this.constantsToImport.push(node);
                    }
                    break;
                case 'labelName':
                    this.beforeConditions = node.value === 'trigger:';
                    this.insideThen = node.value === 'then:';
                    this.lintMetadataNode(node);
                    break;
                case 'propertyName':
                    this.function(node);
                    break;
                default:
                    break;
            }
        }

        if (this.nextConstantToPush) {
            this.constants.push(this.nextConstantToPush);
        }

        return { constants: this.constants, diagnostics: this.diagnostics };
    };

    private lintMetadataNode = (node: LintingNode) => {
        const meta = this.metadata.getByName(node.value);
        if (!meta) return;

        if (this.match('string')) {
            const stringNode = this.previous();
            const possibleValues = meta.possibleValues;
            if (!possibleValues.includes(stringNode.value.slice(1, -1))) {
                this.diagnostics.push(diagnosticFrom(stringNode, invalidValueMessage(possibleValues)));
            }
        }
    };

    private extension = (node: LintingNode) => {
        const extension = this.extensions.getByName(node.value.slice(1, -1), this.triggers[0]);

        if (!extension) {
            this.diagnostics.push(diagnosticFrom(node, invalidValueMessage(this.extensions.getAll(this.triggers[0]))));
        } else {
            this.constants.push(...this.constantsToImport.map((n) => n.value));
            this.constantsToImport.forEach((node) => {
                if (!extension.constants.includes(node.value)) {
                    this.diagnostics.push(diagnosticFrom(node, unknownNodeMessage('constant')));
                }
            });
        }

        this.constantsToImport = [];
    };

    private variable = (prev: LintingNode, node: LintingNode, next?: LintingNode) => {
        const variable = this.variables.getByNameForTriggers(node.value, this.triggers);
        if (!variable) {
            if (this.isAfterSpecialVariable(node)) {
                const prev = this.nodes[this.current - 2];
                this.diagnostics.push({
                    from: prev.from,
                    to: node.to,
                    severity: 'warning',
                    message: unknownNodeMessage('variable'),
                });
                return;
            }

            if (prev.value !== 'def' && !this.insideImport) {
                const isKnownConstant = this.constants.includes(node.value);
                if (!isKnownConstant) {
                    this.diagnostics.push(diagnosticFrom(node, unknownNodeMessage('variable')));
                }
            }

            return;
        }

        if (this.beforeConditions && prev.value === 'def') {
            this.diagnostics.push(diagnosticFrom(node, 'You cannot override event variables', 'error'));
            return;
        }

        if (variable.valueType === 'record' && next?.type !== 'string') {
            this.diagnostics.push(diagnosticFrom(node, unknownNodeMessage('variable')));
            return;
        }

        const possibleOperators = variable.possibleOperators;
        if (this.match('keyword') || this.match('operator')) {
            const operatorNode = this.previous();
            const op = operatorNode.value as Operator;
            if (COMPARISON_OPERATORS.includes(op) && !possibleOperators.includes(op)) {
                this.diagnostics.push(diagnosticFrom(operatorNode, invalidValueMessage(possibleOperators)));
            }
        }

        const possibleValues = variable.possibleValues;
        while (this.match('string') || this.match('number')) {
            const stringNode = this.previous();
            if (!isValueValid(stringNode.value, possibleValues)) {
                this.diagnostics.push(diagnosticFrom(stringNode, invalidValueMessage(possibleValues)));
            }

            if (this.match('controlOperator')) {
                break;
            }
        }
    };

    private function = (node: LintingNode) => {
        if (!this.insideThen) {
            return;
        }

        const action = this.actions.getByName(node.value);
        if (!action) {
            this.diagnostics.push(diagnosticFrom(node, unknownNodeMessage('action')));
            return;
        }

        const params: ParamCompletion[] = [];

        while (this.match('variableName')) {
            const variableNode = this.previous();
            const param = action.params.find((p) => p.label + ':' === variableNode.value);
            if (!param) {
                this.diagnostics.push(diagnosticFrom(variableNode, unknownNodeMessage('argument')));
            }

            param && params.push(param);

            const hasValidType = this.match('string') || this.match('number') || this.match('attributeName');
            if (hasValidType && param) {
                const valueNode = this.previous();
                if (this.triggers.length === 1) {
                    const trigger = this.triggers[0];
                    const possibleValues = param.possibleValuesFor(trigger);
                    const requiredUserInputType = param.userInputValueType;
                    const isValidConstant = valueNode.type === 'attributeName' && param.constantAllowed;
                    if (requiredUserInputType) {
                        const hasRequiredType = valueNode.type === requiredUserInputType;
                        if (!hasRequiredType && !isValidConstant) {
                            this.diagnostics.push(
                                diagnosticFrom(valueNode, expectedValueTypeMessage(requiredUserInputType)),
                            );
                        }
                    } else {
                        const predicate = param.predicate;
                        const [predicateMatches, predicateMsg] = predicate ? predicate(valueNode.value) : [false, ''];
                        if (!predicateMatches && !isValidConstant) {
                            if (possibleValues.length === 0) {
                                this.diagnostics.push(diagnosticFrom(valueNode, invalidValueMessage([], predicateMsg)));
                            } else if (!isValueValid(valueNode.value, possibleValues)) {
                                this.diagnostics.push(
                                    diagnosticFrom(valueNode, invalidValueMessage(possibleValues, predicateMsg)),
                                );
                            }
                        }
                    }
                } else {
                    this.diagnostics.push(diagnosticFrom(valueNode, 'Value does not apply to the given trigger type'));
                }
            }
        }

        const missingParams = action.params.filter((p) => !p.optional && !params.includes(p));
        if (missingParams.length > 0) {
            this.diagnostics.push(diagnosticFrom(node, missingParamsMessage(missingParams), 'error'));
        }
    };

    // Utils

    private previous = (): LintingNode => {
        return this.nodes[this.current - 1];
    };

    private match = (type: string): boolean => {
        if (this.isAtEnd() || this.nodes[this.current].type !== type) return false;
        this.advance();
        return true;
    };

    private advance = (): LintingNode => {
        return this.nodes[this.current++];
    };

    private isAtEnd = () => {
        return this.current >= this.nodes.length;
    };

    private isAfterSpecialVariable = (node: LintingNode) => {
        if (this.current - 2 >= 0) {
            const prev = this.nodes[this.current - 2];
            return prev.value === 'nft.traits' && prev.to === node.from;
        }
        return false;
    };
}

const isValueValid = (value: string, possibleValues: string[]) => {
    if (possibleValues.length === 0) {
        return true;
    }
    return possibleValues.find((val) => '"' + val + '"' === value) !== undefined;
};

const diagnosticFrom = (node: LintingNode, message: string, severity: 'warning' | 'error' = 'warning'): Diagnostic => {
    return {
        from: node.from,
        to: node.to,
        severity: severity,
        message: message,
    };
};

const invalidValueMessage = (possibleValues: string[], additionalInfo?: string) => {
    const hasPossibleValues = possibleValues.length > 0;
    const additionalInfoPrefix = hasPossibleValues ? 'or' : 'Expected';
    return [
        'Given value is invalid.',
        hasPossibleValues ? expectedOneOfMessage(possibleValues) : '',
        additionalInfo ? `${additionalInfoPrefix} ${additionalInfo}.` : '',
    ]
        .filter((v) => !!v)
        .join('\n');
};

const expectedOneOfMessage = (possibleValues: string[]) => {
    const possibleValuesList = '• ' + possibleValues.join('\n• ');
    return 'Expected one of' + '\n' + possibleValuesList;
};

const unknownNodeMessage = (nodeType: string) => {
    return `Unknown ${nodeType}.`;
};

const missingParamsMessage = (params: ParamCompletion[]) => {
    const missingParamsList = '• ' + params.map((p) => p.label).join('\n• ');
    return 'Action is missing one or more arguments:' + '\n' + missingParamsList;
};

const expectedValueTypeMessage = (requiredType: string) => {
    return `Given value is invalid. Expected a ${requiredType}.`;
};
