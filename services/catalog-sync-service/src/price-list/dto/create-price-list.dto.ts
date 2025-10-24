import { IsString, IsBoolean, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreatePriceListDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsOptional()
    priority?: number;

    @IsDateString()
    startDate: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
