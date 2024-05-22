import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Employee } from '../../entities/employee.entity';

export class CreateEmployeeDto {
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

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    birth_date: Date;

    @IsOptional()
    is_active: boolean;

    @IsOptional()
    manager: Employee;

    @IsOptional()
    is_deleted: boolean;
}