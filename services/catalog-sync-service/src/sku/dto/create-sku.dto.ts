import { IsString, IsBoolean, IsOptional, IsInt, IsNumber, MinLength } from 'class-validator';

export class CreateSkuDto {
    @IsInt()
    productId: number;

    @IsString()
    @MinLength(3)
    sku: string;

    @IsString()
    @MinLength(3)
    name: string;

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
