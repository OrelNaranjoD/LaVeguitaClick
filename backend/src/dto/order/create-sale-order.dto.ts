import { IsDate, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class CreateSaleOrderDto {
    @IsOptional()
    @IsDate()
    date?: Date;

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    orderDetailsIds?: number[];
}