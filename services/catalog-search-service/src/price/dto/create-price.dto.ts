import { IsBoolean, IsOptional, IsInt, IsNumber, Min } from 'class-validator';

export class CreatePriceDto {
    @IsInt()
    skuId: number;

    @IsInt()
    priceListId: number;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    costPrice?: number;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
