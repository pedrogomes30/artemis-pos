import { IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class UpdateStoreDto {
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
    address?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    zipCode?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
