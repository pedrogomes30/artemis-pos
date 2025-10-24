import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Artemis POS API is running with Fastify!';
    }
}
