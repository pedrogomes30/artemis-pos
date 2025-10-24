import { IsString, IsInt, IsNumber, IsOptional, Min, MinLength } from 'class-validator';

export class UpdateOrderDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    orderNumber?: string;

    @IsInt()
    @IsOptional()
    userId?: number;

    @IsInt()
    @IsOptional()
    storeId?: number;

    @IsInt()
    @IsOptional()
    customerId?: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    subtotal?: number;

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
    @IsOptional()
    total?: number;

    @IsString()
    @IsOptional()
    notes?: string;
}
