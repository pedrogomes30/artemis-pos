import { Expose } from 'class-transformer';

export class CategoryResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description?: string;

    @Expose()
    parentId?: number;

    @Expose()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
