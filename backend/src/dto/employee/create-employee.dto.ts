import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Employee } from '../../entities/employee.entity';
import { IsRut } from '../../validators/rut/rut.validator';
import { CreateAddressDto } from '../address/create-address.dto';
import { CreateEmployeeDetailDto } from './create-employee-detail.dto';

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsRut()
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

    @IsNotEmpty()
    birth_date: Date;

    @IsOptional()
    is_active: boolean;

    @IsOptional()
    manager: Employee;

    @IsOptional()
    is_deleted: boolean;

    @IsOptional()
    @IsArray()
    employeeDetails: CreateEmployeeDetailDto[];

    @IsOptional()
    @IsArray()
    address: CreateAddressDto[];
}