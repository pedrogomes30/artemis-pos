import { Expose } from 'class-transformer';

export class OrderTaxResponseDto {
    @Expose()
    id: number;

    @Expose()
    orderId: number;

    @Expose()
    name: string;

    @Expose()
    rate: number;

    @Expose()
    amount: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
