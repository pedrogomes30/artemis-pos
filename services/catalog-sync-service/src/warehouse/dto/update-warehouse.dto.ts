import { IsString, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class UpdateWarehouseDto {
    @IsInt()
    @IsOptional()
    storeId?: number;

    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
