import { IsDate, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class CreatePurchaseOrderDto {
    @IsOptional()
    @IsDate()
    date?: Date;

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    @IsNumber()
    supplierId: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    orderDetailsIds?: number[];
}