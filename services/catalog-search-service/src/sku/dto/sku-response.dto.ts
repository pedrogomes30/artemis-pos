import { Expose } from 'class-transformer';

export class SkuResponseDto {
    @Expose()
    id: number;

    @Expose()
    productId: number;

    @Expose()
    sku: string;

    @Expose()
    name: string;

    @Expose()
    barcode?: string;

    @Expose()
    variant?: string;

    @Expose()
    weight?: number;

    @Expose()
    dimensions?: string;

    @Expose()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
