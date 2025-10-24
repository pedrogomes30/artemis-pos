import { IsString, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(3)
    name: string;

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
