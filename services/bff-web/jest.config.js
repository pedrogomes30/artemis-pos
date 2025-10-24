module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    
    rootDir: '.',
    
    testMatch: [
        '<rootDir>/tests/**/*.spec.ts',
        '<rootDir>/tests/**/*.test.ts'
    ],
    
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    
    collectCoverageFrom: [
        'src/**/*.(t|j)s',
        '!src/**/*.spec.ts',
        '!src/**/*.test.ts',
        '!src/main.ts',
    ],
    
    coverageDirectory: 'coverage',
    
    testEnvironment: 'node',
    
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^tests/(.*)$': '<rootDir>/tests/$1',
    },
    
    transformIgnorePatterns: [
        'node_modules/(?!(.*\\.mjs$))',
    ],
    
    clearMocks: true,
    
    restoreMocks: true,
    
    testTimeout: 30000,
    
    coverageReporters: ['text', 'lcov', 'html'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};