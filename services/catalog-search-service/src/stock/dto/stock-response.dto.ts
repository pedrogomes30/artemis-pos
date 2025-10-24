import { Expose } from 'class-transformer';

export class StockResponseDto {
    @Expose()
    id: number;

    @Expose()
    skuId: number;

    @Expose()
    warehouseId: number;

    @Expose()
    quantity: number;

    @Expose()
    reserved: number;

    @Expose()
    available: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
