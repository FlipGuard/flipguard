export const randomInt = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min));
};

export const random = (min: number, max: number, unit: 'px' | '%') => {
    return randomInt(min, max) + unit;
};

export const oneOf = (values: number[], unit: 'px' | '%') => {
    return values[randomInt(0, values.length)] + unit;
};
