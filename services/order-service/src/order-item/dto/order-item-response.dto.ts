import { Expose } from 'class-transformer';

export class OrderItemResponseDto {
    @Expose()
    id: number;

    @Expose()
    orderId: number;

    @Expose()
    skuId: number;

    @Expose()
    quantity: number;

    @Expose()
    unitPrice: number;

    @Expose()
    discountAmount: number;

    @Expose()
    subtotal: number;

    @Expose()
    total: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
