import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AppResponseDto } from '../src/app/dto/app-response.dto';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!" in DTO format', () => {
            const result = appController.getHello();
            expect(result).toBeInstanceOf(AppResponseDto);
            expect(result.message).toBe('Hello World!');
        });
    });
});
