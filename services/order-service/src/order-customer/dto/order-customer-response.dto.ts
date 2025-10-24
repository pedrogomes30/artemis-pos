import { Expose } from 'class-transformer';

export class OrderCustomerResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email?: string;

    @Expose()
    phone?: string;

    @Expose()
    document?: string;

    @Expose()
    address?: string;

    @Expose()
    city?: string;

    @Expose()
    state?: string;

    @Expose()
    zipCode?: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
