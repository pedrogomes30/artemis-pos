import { IsString, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsOptional()
    parentId?: number;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
