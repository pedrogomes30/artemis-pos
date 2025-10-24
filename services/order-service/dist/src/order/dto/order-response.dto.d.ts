export declare class OrderResponseDto {
    id: number;
    orderNumber: string;
    userId: number;
    storeId: number;
    customerId?: number;
    status: string;
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
