import { Expose } from 'class-transformer';

export class PriceListResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description?: string;

    @Expose()
    priority: number;

    @Expose()
    startDate: Date;

    @Expose()
    endDate?: Date;

    @Expose()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
