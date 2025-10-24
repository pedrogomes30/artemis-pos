import { IsString, IsInt, IsNumber, IsOptional, Min, MinLength } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @MinLength(3)
    orderNumber: string;

    @IsInt()
    userId: number;

    @IsInt()
    storeId: number;

    @IsInt()
    @IsOptional()
    customerId?: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @Min(0)
    subtotal: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    discountAmount?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    taxAmount?: number;

    @IsNumber()
    @Min(0)
    total: number;

    @IsString()
    @IsOptional()
    notes?: string;
}
