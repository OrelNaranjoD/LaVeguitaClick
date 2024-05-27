import { Module } from '@nestjs/common';
import { CityController } from '../controllers/city/city.controller';
import { CityService } from '../services/city/city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
