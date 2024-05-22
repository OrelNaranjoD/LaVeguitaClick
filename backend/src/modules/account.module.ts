import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from '../controllers/account/account.controller';
import { Account } from '../entities/account.entity';
import { Privilege } from '../entities/privilege.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { AccountService } from '../services/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User, Role, Privilege])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
