import { Expose } from 'class-transformer';

export class OrderPaymentResponseDto {
    @Expose()
    id: number;

    @Expose()
    orderId: number;

    @Expose()
    method: string;

    @Expose()
    amount: number;

    @Expose()
    status: string;

    @Expose()
    transactionId?: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
