import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseService } from './services/database/database.service';
import * as dotenv from 'dotenv';

// Load environment variables file
dotenv.config({ path: '../.env' });

// Import Modules
import { PrivilegeModule } from './modules/privilege.module';
import { RoleModule } from './modules/role.module';
import { AuditAuthModule } from './modules/audit-auth.module';
import { AuthModule } from './modules/auth.module';
import { AccountModule } from './modules/account.module';
import { UserModule } from './modules/user.module';
import { StatusModule } from './modules/status.module';
import { ImageModule } from './modules/image.module';
import { ProductModule } from './modules/product.module';
import { CategoryModule } from './modules/category.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
    AuthModule,
    AccountModule,
    UserModule,
    RoleModule,
    AuditAuthModule,
    PrivilegeModule,
    StatusModule,
    ImageModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule { }
