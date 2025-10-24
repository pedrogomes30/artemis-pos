import { IsString, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsOptional()
    categoryId?: number;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
