import { Module } from '@nestjs/common';
import { AuditAuth } from '../entities/audit-auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditAuthController } from '../controllers/audit-auth/audit-auth.controller';
import { AuditAuthService } from '../services/audit-auth/audit-auth.service';
import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { Privilege } from '../entities/privilege.entity';
import { Role } from '../entities/role.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AuditAuth, User, Role, Privilege, Account])],
  controllers: [AuditAuthController],
  providers: [AuditAuthService],
})
export class AuditAuthModule {}
