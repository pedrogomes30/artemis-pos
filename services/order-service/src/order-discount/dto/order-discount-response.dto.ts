import { Expose } from 'class-transformer';

export class OrderDiscountResponseDto {
    @Expose()
    id: number;

    @Expose()
    orderId: number;

    @Expose()
    type: string;

    @Expose()
    value: number;

    @Expose()
    amount: number;

    @Expose()
    reason?: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
