import { IsString, IsBoolean, IsOptional, IsInt, MinLength } from 'class-validator';

export class CreateWarehouseDto {
    @IsInt()
    storeId: number;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(2)
    code: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
