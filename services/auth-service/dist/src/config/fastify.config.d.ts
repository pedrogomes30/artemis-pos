import { FastifyAdapter } from '@nestjs/platform-fastify';
export declare function createFastifyAdapter(): FastifyAdapter;
export declare const fastifyConfig: {
    cors: {
        origin: string;
        credentials: boolean;
        methods: string[];
        allowedHeaders: string[];
    };
    validation: {
        transform: boolean;
        whitelist: boolean;
        forbidNonWhitelisted: boolean;
        skipMissingProperties: boolean;
        validationError: {
            target: boolean;
            value: boolean;
        };
    };
    timeout: number;
};
