import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderItemDto {
    @IsInt()
    @IsOptional()
    orderId?: number;

    @IsInt()
    @IsOptional()
    skuId?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    unitPrice?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    discountAmount?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    subtotal?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    total?: number;
}
