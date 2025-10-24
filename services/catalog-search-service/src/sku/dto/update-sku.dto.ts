import { IsString, IsBoolean, IsOptional, IsInt, IsNumber, MinLength } from 'class-validator';

export class UpdateSkuDto {
    @IsInt()
    @IsOptional()
    productId?: number;

    @IsString()
    @MinLength(3)
    @IsOptional()
    sku?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    barcode?: string;

    @IsString()
    @IsOptional()
    variant?: string;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsString()
    @IsOptional()
    dimensions?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
