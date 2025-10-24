import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateStockDto {
    @IsInt()
    skuId: number;

    @IsInt()
    warehouseId: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNumber()
    @Min(0)
    reserved: number;

    @IsNumber()
    @Min(0)
    available: number;
}
