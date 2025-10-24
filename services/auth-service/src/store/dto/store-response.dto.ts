import { Expose } from 'class-transformer';

export class StoreResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    code: string;

    @Expose()
    address?: string;

    @Expose()
    city?: string;

    @Expose()
    state?: string;

    @Expose()
    zipCode?: string;

    @Expose()
    phone?: string;

    @Expose()
    email?: string;

    @Expose()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
