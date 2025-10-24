import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderPaymentDto {
    @IsInt()
    orderId: number;

    @IsString()
    method: string;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    transactionId?: string;
}
