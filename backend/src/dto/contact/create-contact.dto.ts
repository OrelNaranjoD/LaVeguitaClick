import { IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  position: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

}