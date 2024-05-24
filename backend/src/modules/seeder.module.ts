import { Module } from '@nestjs/common';
import { SeederController } from '../controllers/seeder/seeder.controller';
import { SeederService } from '../services/seeder/seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../entities/city.entity';
import { Region } from '../entities/region.entity';
import { Country } from '../entities/country.entity';
import { Commune } from '../entities/commune.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Region, City, Commune])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
