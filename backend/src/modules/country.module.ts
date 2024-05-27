import { Module } from '@nestjs/common';
import { CountryService } from '../services/country/country.service';
import { CountryController } from '../controllers/country/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
