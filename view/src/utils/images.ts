export const getValidImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('ipfs://')) {
        const cid = imageUrl.substring(imageUrl.indexOf('//') + 2);
        return encodeURI('https://ipfs.io/ipfs/' + cid);
    }
    return imageUrl.startsWith('http') ? imageUrl : '';
};
