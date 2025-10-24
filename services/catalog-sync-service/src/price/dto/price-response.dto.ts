import { Expose } from 'class-transformer';

export class PriceResponseDto {
    @Expose()
    id: number;

    @Expose()
    skuId: number;

    @Expose()
    priceListId: number;

    @Expose()
    price: number;

    @Expose()
    costPrice?: number;

    @Expose()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
