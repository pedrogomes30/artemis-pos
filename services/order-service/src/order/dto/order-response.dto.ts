import { Expose } from 'class-transformer';

export class OrderResponseDto {
    @Expose()
    id: number;

    @Expose()
    orderNumber: string;

    @Expose()
    userId: number;

    @Expose()
    storeId: number;

    @Expose()
    customerId?: number;

    @Expose()
    status: string;

    @Expose()
    subtotal: number;

    @Expose()
    discountAmount: number;

    @Expose()
    taxAmount: number;

    @Expose()
    total: number;

    @Expose()
    notes?: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
