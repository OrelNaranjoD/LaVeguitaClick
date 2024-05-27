import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCityDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  regionId: number;
}