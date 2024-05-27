import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateRegionDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  countryId: number;
}