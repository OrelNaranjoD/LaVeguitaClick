import { IsNumber, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  iso2: string;
}