import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../address/create-address.dto';

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    run: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsBoolean()
    is_active: boolean;

    @IsOptional()
    @IsBoolean()
    is_deleted: boolean;

    @IsArray()
    address: CreateAddressDto[];
}