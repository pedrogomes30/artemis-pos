import { IsInt, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateStockDto {
    @IsInt()
    @IsOptional()
    skuId?: number;

    @IsInt()
    @IsOptional()
    warehouseId?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    reserved?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    available?: number;
}
