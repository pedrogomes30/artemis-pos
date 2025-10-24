export declare class OrderPaymentResponseDto {
    id: number;
    orderId: number;
    method: string;
    amount: number;
    status: string;
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}
