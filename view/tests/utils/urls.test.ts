import { describe, expect, it } from 'vitest';

import { getDomainFromUrl } from '../../src/utils/urls';

describe.concurrent('getDomainFromUrl', () => {
    const tests = [
        { url: 'http://localhost:8080/api', expected: 'localhost' },
        { url: 'http://localhost:8080', expected: 'localhost' },
        { url: 'http://localhost/api', expected: 'localhost' },
        { url: 'http://localhost', expected: 'localhost' },
        { url: 'https://api.flipguard.xyz/path', expected: 'flipguard.xyz' },
        { url: 'https://api.flipguard.xyz', expected: 'flipguard.xyz' },
        { url: 'https://flipguard.xyz', expected: 'flipguard.xyz' },
    ];

    tests.forEach(({ url, expected }) => {
        it(`should return ${expected} for ${url}`, () => {
            expect(getDomainFromUrl(url)).to.be.equal(expected);
        });
    });
});
