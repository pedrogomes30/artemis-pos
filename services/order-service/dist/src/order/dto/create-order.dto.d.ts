export declare class CreateOrderDto {
    orderNumber: string;
    userId: number;
    storeId: number;
    customerId?: number;
    status?: string;
    subtotal: number;
    discountAmount?: number;
    taxAmount?: number;
    total: number;
    notes?: string;
}
