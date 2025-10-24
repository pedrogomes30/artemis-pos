"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyConfig = void 0;
exports.createFastifyAdapter = createFastifyAdapter;
const platform_fastify_1 = require("@nestjs/platform-fastify");
function createFastifyAdapter() {
    return new platform_fastify_1.FastifyAdapter({
        logger: process.env.APP_AMBIENT !== 'production',
        trustProxy: true,
        connectionTimeout: 30000,
        keepAliveTimeout: 30000,
        bodyLimit: 10485760,
        ignoreTrailingSlash: true,
        caseSensitive: false,
        requestIdHeader: 'x-request-id',
        requestIdLogLabel: 'reqId',
        ajv: {
            customOptions: {
                removeAdditional: 'all',
                coerceTypes: true,
                useDefaults: true,
            },
        },
    });
}
exports.fastifyConfig = {
    cors: {
        origin: process.env.APP_FRONTEND_URL || '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
    },
    validation: {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        validationError: {
            target: false,
            value: false,
        },
    },
    timeout: 30000,
};
//# sourceMappingURL=fastify.config.js.map