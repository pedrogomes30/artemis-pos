import { IsString, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    categoryId: number;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
