import { Module } from '@nestjs/common';
import { CommuneService } from '../services/commune/commune.service';
import { CommuneController } from '../controllers/commune/commune.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commune } from '../entities/commune.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commune])],
  controllers: [CommuneController],
  providers: [CommuneService],
})
export class CommuneModule {}
