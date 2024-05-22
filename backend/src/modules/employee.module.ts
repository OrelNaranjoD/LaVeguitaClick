import { Module } from '@nestjs/common';
import { EmployeeService } from '../services/employee/employee.service';
import { EmployeeController } from '../controllers/employee/employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { EmployeeDetail } from '../entities/employee-detail.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Employee, EmployeeDetail])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
