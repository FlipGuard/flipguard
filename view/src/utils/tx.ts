export const stringToHex = (str: string): `0x${string}` => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i).toString(16);
        result += charCode.length < 2 ? '0' + charCode : charCode;
    }
    return `0x${result}`;
};
