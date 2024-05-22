import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeDetail } from '../../entities/employee-detail.entity';
import { CreateEmployeeDto } from '../../dto/employee/create-employee.dto';
import { UpdateEmployeeDto } from '../../dto/employee/update-employee.dto';
import { CreateEmployeeDetailDto } from '../../dto/employee/create-employee-detail.dto';
import { UpdateEmployeeDetailDto } from '../../dto/employee/update-employee-detail.dto';
import { validateAndFormatRut } from '../../utils/rut/rut.util';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeDetail)
    private employeeDetailRepository: Repository<EmployeeDetail>,
  ) {}

  // Create a new employee
  create(createEmployeeDto: CreateEmployeeDto) {
    const formattedRut = validateAndFormatRut(createEmployeeDto.run);
    if (formattedRut === false) {
      throw new BadRequestException('Invalid RUT');
    }
    createEmployeeDto.run = formattedRut;
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(newEmployee);
  }

  // Create a new employee details
  async createDetail(employeeId: number, createEmployeeDetailDto: CreateEmployeeDetailDto) {
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    const newEmployeeDetail = this.employeeDetailRepository.create(createEmployeeDetailDto);
    newEmployeeDetail.employee = employee;
    return this.employeeDetailRepository.save(newEmployeeDetail);
  }

  // Retrieve all employees
  findAll() {
    return this.employeeRepository.find();
  }

  // Retrieve a single employee and its details
  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id: id }, relations: ['employeeDetails']});
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  // Update an employee
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  // Update an detail employee
  async updateDetail(id: number, updateEmployeeDetailDto: UpdateEmployeeDetailDto) {
    const employeeDetail = await this.employeeDetailRepository.findOne({ where: { id: id }});
    if (!employeeDetail) {
      throw new NotFoundException(`Employee Detail with ID ${id} not found`);
    }
    return this.employeeDetailRepository.update(id, updateEmployeeDetailDto);
  }

  // Remove an employee and its details
  async remove(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id: id }, relations: ['employeeDetails']});
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    for (const detail of employee.employeeDetails) {
      await this.employeeDetailRepository.update(detail.id, { is_deleted: true });
    }
    return this.employeeRepository.update(id, { is_deleted: true });
  }
}
