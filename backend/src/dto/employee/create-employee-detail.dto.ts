import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ContractType } from '../../entities/enumerators/contract-type';
import { Employee } from '../../entities/employee.entity';

export class CreateEmployeeDetailDto {
    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsNotEmpty()
    @IsNumber()
    salary: number;

    @IsNotEmpty()
    hire_date: Date;

    @IsOptional()
    fire_date: Date;

    @IsNotEmpty()
    @IsEnum(ContractType)
    contract_type: ContractType;

    @IsNotEmpty()
    @IsNumber()
    contract_number: number;

    @IsNotEmpty()
    @IsNumber()
    employee: Employee;

    @IsOptional()
    is_deleted: boolean;
}