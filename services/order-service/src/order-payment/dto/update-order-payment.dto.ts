import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderPaymentDto {
    @IsInt()
    @IsOptional()
    orderId?: number;

    @IsString()
    @IsOptional()
    method?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    amount?: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    transactionId?: string;
}
