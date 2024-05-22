import { Module } from '@nestjs/common';
import { PrivilegeService } from '../services/privilege/privilege.service';
import { PrivilegeController } from '../controllers/privilege/privilege.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege } from '../entities/privilege.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Privilege])],
  controllers: [PrivilegeController],
  providers: [PrivilegeService],
})
export class PrivilegeModule {}
