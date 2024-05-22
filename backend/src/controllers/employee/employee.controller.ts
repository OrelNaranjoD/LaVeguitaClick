import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { CreateEmployeeDto } from '../../dto/employee/create-employee.dto';
import { UpdateEmployeeDto } from '../../dto/employee/update-employee.dto';
import { UpdateEmployeeDetailDto } from '../../dto/employee/update-employee-detail.dto';
import { CreateEmployeeDetailDto } from '../../dto/employee/create-employee-detail.dto';


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Post(':id/detail')
  createDetail(@Param('id') id: string, @Body() createEmployeeDetailDto: CreateEmployeeDetailDto) {
    return this.employeeService.createDetail(+id, createEmployeeDetailDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Patch(':id/detail')
  updateDetail(@Param('id') id: string, @Body() updateEmployeeDetailDto: UpdateEmployeeDetailDto) {
    return this.employeeService.updateDetail(+id, updateEmployeeDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
