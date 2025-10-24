import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderTaxDto {
    @IsInt()
    @IsOptional()
    orderId?: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    rate?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    amount?: number;
}
