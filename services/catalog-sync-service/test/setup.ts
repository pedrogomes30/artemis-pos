import 'reflect-metadata';

beforeAll(async () => {
});

afterAll(async () => {
});

global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: console.error,
};
