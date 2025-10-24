export declare class SkuResponseDto {
    id: number;
    productId: number;
    sku: string;
    name: string;
    barcode?: string;
    variant?: string;
    weight?: number;
    dimensions?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
