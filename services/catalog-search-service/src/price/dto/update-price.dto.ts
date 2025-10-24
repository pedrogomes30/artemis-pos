import { IsBoolean, IsOptional, IsInt, IsNumber, Min } from 'class-validator';

export class UpdatePriceDto {
    @IsInt()
    @IsOptional()
    skuId?: number;

    @IsInt()
    @IsOptional()
    priceListId?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    costPrice?: number;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
