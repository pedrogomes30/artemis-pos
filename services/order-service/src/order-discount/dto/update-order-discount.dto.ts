import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderDiscountDto {
    @IsInt()
    @IsOptional()
    orderId?: number;

    @IsString()
    @IsOptional()
    type?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    value?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    amount?: number;

    @IsString()
    @IsOptional()
    reason?: string;
}
