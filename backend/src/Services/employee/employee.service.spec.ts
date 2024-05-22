import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EmployeeService } from './employee.service';
import { Employee } from '../../entities/employee.entity';
import { EmployeeDetail } from '../../entities/employee-detail.entity';
import { CreateEmployeeDto } from '../../dto/employee/create-employee.dto';
import { CreateEmployeeDetailDto } from '../../dto/employee/create-employee-detail.dto';
import { UpdateEmployeeDto } from '../../dto/employee/update-employee.dto';
import { UpdateEmployeeDetailDto } from '../../dto/employee/update-employee-detail.dto';
import { BadRequestException } from '@nestjs/common';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employeeRepository: Repository<Employee>;
  let employeeDetailRepository: Repository<EmployeeDetail>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: getRepositoryToken(Employee), useClass: Repository },
        { provide: getRepositoryToken(EmployeeDetail), useClass: Repository },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<Repository<Employee>>(getRepositoryToken(Employee));
    employeeDetailRepository = module.get<Repository<EmployeeDetail>>(getRepositoryToken(EmployeeDetail));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an employee with a valid RUT', async () => {
    const dto = new CreateEmployeeDto();
    dto.run = '12.345.678-5';
    const employee = new Employee();
    jest.spyOn(employeeRepository, 'create').mockReturnValue(employee);
    jest.spyOn(employeeRepository, 'save').mockResolvedValue(employee);
    expect(await service.create(dto)).toBe(employee);
  });

  it('should create an employee detail', async () => {
    const dto = new CreateEmployeeDetailDto();
    const employee = new Employee();
    const employeeDetail = new EmployeeDetail();
    jest.spyOn(employeeRepository, 'findOneBy').mockResolvedValue(employee);
    jest.spyOn(employeeDetailRepository, 'create').mockReturnValue(employeeDetail);
    jest.spyOn(employeeDetailRepository, 'save').mockResolvedValue(employeeDetail);
    expect(await service.createDetail(1, dto)).toBe(employeeDetail);
  });

  it('should find all employees', async () => {
    const employees = [new Employee(), new Employee()];
    jest.spyOn(employeeRepository, 'find').mockResolvedValue(employees);
    expect(await service.findAll()).toBe(employees);
  });

  it('should find one employee', async () => {
    const employeeDetail = new EmployeeDetail();
    const employee = new Employee();
    employee.employeeDetails = [employeeDetail];
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(employee);
    const foundEmployee = await service.findOne(1);
    expect(foundEmployee).toBe(employee);
    expect(foundEmployee.employeeDetails).toEqual([employeeDetail]);
  });

  it('should update an employee', async () => {
    const dto = new UpdateEmployeeDto();
    const updateResult = new UpdateResult();
    jest.spyOn(employeeRepository, 'update').mockResolvedValue(updateResult);
    expect(await service.update(1, dto)).toBe(updateResult);
  });

  it('should update an employee detail', async () => {
    const dto = new UpdateEmployeeDetailDto();
    const employeeDetail = new EmployeeDetail();
    const updateResult = new UpdateResult();
    jest.spyOn(employeeDetailRepository, 'findOne').mockResolvedValue(employeeDetail);
    jest.spyOn(employeeDetailRepository, 'update').mockResolvedValue(updateResult);
    expect(await service.updateDetail(1, dto)).toBe(updateResult);
  });

  it('should remove an employee', async () => {
    const employee = new Employee();
    const employeeDetail = new EmployeeDetail();
    employee.employeeDetails = [employeeDetail];
    const updateResult = new UpdateResult();
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(employee);
    jest.spyOn(employeeDetailRepository, 'update').mockResolvedValue(updateResult);
    jest.spyOn(employeeRepository, 'update').mockResolvedValue(updateResult);
    expect(await service.remove(1)).toBe(updateResult);
  });

  it('should throw an error when trying to create an employee with an invalid RUT', async () => {
    const dto = new CreateEmployeeDto();
    dto.run = '12.345.678-9';
    try {
      await service.create(dto);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('Invalid RUT');
    }
  });

  it('should throw an error if employee not found when creating detail', async () => {
    jest.spyOn(employeeRepository, 'findOneBy').mockResolvedValue(null);
    await expect(service.createDetail(1, new CreateEmployeeDetailDto())).rejects.toThrow();
  });

  it('should throw an error if employee not found when finding one', async () => {
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow();
  });

  it('should throw an error if employee detail not found when updating detail', async () => {
    jest.spyOn(employeeDetailRepository, 'findOne').mockResolvedValue(null);
    await expect(service.updateDetail(1, new UpdateEmployeeDetailDto())).rejects.toThrow();
  });

  it('should throw an error if employee not found when removing', async () => {
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(null);
    await expect(service.remove(1)).rejects.toThrow();
  });

});