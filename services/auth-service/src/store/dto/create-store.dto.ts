import { IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateStoreDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(2)
    code: string;

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
