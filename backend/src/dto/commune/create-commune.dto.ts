import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCommuneDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  cityId: number;
}