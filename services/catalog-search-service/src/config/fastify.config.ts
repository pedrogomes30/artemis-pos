import { FastifyAdapter } from '@nestjs/platform-fastify';

export function createFastifyAdapter(): FastifyAdapter {
    return new FastifyAdapter({
        // Configurações do Fastify
        logger: process.env.APP_AMBIENT !== 'production', // Log apenas em dev
        trustProxy: true, // Confiar em proxies (nginx, load balancer)
        
        // Configurações de timeout
        connectionTimeout: 30000, // 30 segundos
        keepAliveTimeout: 30000, // 30 segundos
        
        // Limites de requisição
        bodyLimit: 10485760, // 10MB
        
        // Configurações de JSON
        ignoreTrailingSlash: true, // /users e /users/ são tratados igualmente
        caseSensitive: false, // Rotas não são case-sensitive
        
        // Configuração de request ID
        requestIdHeader: 'x-request-id',
        requestIdLogLabel: 'reqId',
        
        // Configurações de desempenho
        ajv: {
            customOptions: {
                removeAdditional: 'all',
                coerceTypes: true,
                useDefaults: true,
            },
        },
    });
}

// Configurações adicionais para aplicar no app
export const fastifyConfig = {
    // Configuração de CORS
    cors: {
        origin: process.env.APP_FRONTEND_URL || '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
    },
    
    // Configuração de Validation Pipe
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
    
    // Configuração de timeout global
    timeout: 30000, // 30 segundos
};
