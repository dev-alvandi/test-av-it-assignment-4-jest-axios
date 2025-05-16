import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node', // or 'jsdom' if you test browser fetch
    verbose: true,
    testMatch: ['**/tests/**/*.test.ts'],
};

export default config;
