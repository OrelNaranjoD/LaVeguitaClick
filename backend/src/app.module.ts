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
import { EmployeeModule } from './modules/employee.module';
import { SupplierModule } from './modules/supplier.module';
import { CountryModule } from './modules/country.module';
import { CommuneModule } from './modules/commune.module';
import { SeederModule } from './modules/seeder.module';
import { AddressModule } from './modules/address.module';
import { ContactModule } from './modules/contact.module';
import { CityModule } from './modules/city.module';
import { RegionModule } from './modules/region.module';

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
    EmployeeModule,
    SupplierModule,
    AddressModule,
    ContactModule,
    SeederModule,
    CountryModule,
    CityModule,
    RegionModule,
    CommuneModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule { }
