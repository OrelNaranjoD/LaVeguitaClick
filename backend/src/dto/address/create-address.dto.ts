import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  zip_code: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsNumber()
  communeId: number;
}