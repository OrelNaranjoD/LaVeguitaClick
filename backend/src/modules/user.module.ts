import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user/user.controller';
import { Account } from '../entities/account.entity';
import { Privilege } from '../entities/privilege.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Privilege, Account])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
