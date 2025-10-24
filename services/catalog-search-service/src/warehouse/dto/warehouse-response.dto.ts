import { Expose } from 'class-transformer';

export class WarehouseResponseDto {
    @Expose()
    id: number;

    @Expose()
    storeId: number;

    @Expose()
    name: string;

    @Expose()
    code: string;

    @Expose()
    type: string;

    @Expose()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
