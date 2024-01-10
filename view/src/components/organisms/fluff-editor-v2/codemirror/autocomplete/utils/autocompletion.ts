export const possibleFixedValues = (values: string[], quote = '', insideList = false) => {
    const leftBracket = insideList ? '[' : '';
    const rightBracket = insideList ? ']' : '';
    return values.map((val) => ({
        label: leftBracket + quote + val + quote + rightBracket,
        type: 'keyword',
    }));
};
