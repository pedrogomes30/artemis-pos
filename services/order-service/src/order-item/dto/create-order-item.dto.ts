import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderItemDto {
    @IsInt()
    orderId: number;

    @IsInt()
    skuId: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    discountAmount?: number;

    @IsNumber()
    @Min(0)
    subtotal: number;

    @IsNumber()
    @Min(0)
    total: number;
}
