import { IsString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateOrderTaxDto {
    @IsInt()
    orderId: number;

    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    rate: number;

    @IsNumber()
    @Min(0)
    amount: number;
}
