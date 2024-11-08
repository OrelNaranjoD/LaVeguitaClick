import { Module } from '@nestjs/common';
import { RegionController } from '../controllers/region/region.controller';
import { RegionService } from '../services/region/region.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from '../entities/region.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
