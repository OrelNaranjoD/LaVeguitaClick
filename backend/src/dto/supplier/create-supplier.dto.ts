import { IsString, IsBoolean, IsEmail, IsArray, IsOptional } from 'class-validator';
import { CreateContactDto } from '../contact/create-contact.dto';
import { CreateAddressDto } from '../address/create-address.dto';

export class CreateSupplierDto {
  @IsString()
  rut: string;

  @IsString()
  company_name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsArray()
  contacts: CreateContactDto[];

  @IsArray()
  address: CreateAddressDto[];
}