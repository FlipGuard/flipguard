import React from 'react';

import { CustomTable } from '../../../../../components/molecules/table/CustomTable';
import { RumbleLinesTableRow } from './RumbleLinesTableRow';
import { RumbleLinesTableRowHeader } from './RumbleLinesTableRowHeader';

type Props = {
    lines: string[];
    searchText: string;
    onLineEdit: (idx: number) => void;
    onLineRemove: (idx: number) => void;
    loading: boolean;
};

export const RumbleLinesTable = ({ lines, searchText, onLineEdit, onLineRemove, loading }: Props) => {
    const linesWithIndex: [string, number][] = lines.map((line, idx) => [line, idx]);
    const filtered = linesWithIndex.filter(([v]) => v.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <CustomTable header={RumbleLinesTableRowHeader} loading={false}>
            {filtered.map(([line, idx]) => (
                <RumbleLinesTableRow
                    key={idx}
                    idx={idx}
                    line={line}
                    onEdit={() => onLineEdit(idx)}
                    onRemove={() => onLineRemove(idx)}
                    loading={loading}
                />
            ))}
        </CustomTable>
    );
};
