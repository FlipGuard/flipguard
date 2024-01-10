import { ScanResult } from '@flipguard/webapp-fluff-api';

import { FluffEditorContext } from './codemirror/fluff-codemirror-api';
import useFluffEditorV2, { FluffEditorMode } from './codemirror/fluff-editor-v2';

type Props = {
    code: string[];
    onChange: (value: string[]) => void;
    onLint: (scanResult: ScanResult, errorsFound: boolean) => void;
    mode: FluffEditorMode;
    ctx: FluffEditorContext;
};

export const FluffEditorV2 = ({ code, onChange, onLint, mode, ctx }: Props) => {
    const { ref } = useFluffEditorV2({
        initialState: code,
        onChange: onChange,
        onLint: onLint,
        mode,
        ctx,
    });

    return <div style={{ display: 'flex' }} ref={ref} />;
};
