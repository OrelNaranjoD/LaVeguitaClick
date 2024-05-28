import { Module } from '@nestjs/common';
import { CustomerService } from '../services/customer/customer.service';
import { CustomerController } from '../controllers/customer/customer.controller';
import { Customer } from '../entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
