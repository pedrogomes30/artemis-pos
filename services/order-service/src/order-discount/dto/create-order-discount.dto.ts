import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderDiscountDto {
    @IsInt()
    orderId: number;

    @IsString()
    type: string;

    @IsNumber()
    @Min(0)
    value: number;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsString()
    @IsOptional()
    reason?: string;
}
