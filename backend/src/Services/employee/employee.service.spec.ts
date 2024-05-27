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
import { ContractType } from '../../entities/enumerators/contract-type';

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

  it('should create an employee', async () => {
    const employee = {
      id: 1,
      run: '12345678-5',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'employee@example.com',
      phone: '1234567890',
      birth_date: new Date(),
      is_active: true,
      is_deleted: undefined,
      manager: null,
      employeeDetails: [],
      address: []
    };
    jest.spyOn(employeeRepository, 'create').mockImplementation(() => employee as any);
    jest.spyOn(employeeRepository, 'save').mockImplementation(() => Promise.resolve(employee as any));

    expect(await service.create(employee)).toEqual(employee);
  });

  it('should create a full employee detail', async () => {
    const employee = new Employee();
    employee.id = 1;
    const dto = {
      position: 'Position',
      department: 'Department',
      salary: 50000,
      hire_date: new Date(),
      fire_date: null,
      contract_type: ContractType.INDEFINITE,
      contract_number: 123456,
      employee: employee,
      is_deleted: false
    };

    const employeeDetail = new EmployeeDetail();
    Object.assign(employeeDetail, dto);

    jest.spyOn(employeeRepository, 'findOneBy').mockResolvedValue(employee);
    jest.spyOn(employeeDetailRepository, 'create').mockReturnValue(employeeDetail);
    jest.spyOn(employeeDetailRepository, 'save').mockResolvedValue(employeeDetail);

    const createdDetail = await service.createDetail(1, dto);
    expect(createdDetail).toEqual(employeeDetail);
  });

  it('should find all employees', async () => {
    const employees = [{ id: 1, first_name: 'First Name', last_name: 'Last Name' }];
    jest.spyOn(employeeRepository, 'find').mockImplementation(() => Promise.resolve(employees as any));

    expect(await service.findAll()).toEqual(employees);
  });

  it('should find one employee with details', async () => {
    const employeeDetail = {
      id: 1,
      position: 'Position',
      phone: '1234567890',
      email: 'detail@example.com'
    };
    const employee = {
      id: 1,
      run: '12345678-9',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'employee@example.com',
      phone: '1234567890',
      birth_date: new Date(),
      is_active: true,
      is_deleted: undefined,
      manager: null,
      employeeDetails: [employeeDetail],
      address: []
    };
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(employee as any);

    const foundEmployee = await service.findOne(1);
    expect(foundEmployee).toEqual(employee);
    expect(foundEmployee.employeeDetails).toEqual([employeeDetail]);
  });

  it('should update an employee', async () => {
    const employee = { first_name: 'First Name Update', last_name: 'Last Name Update' };
    jest.spyOn(employeeRepository, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, employee)).toEqual({ affected: 1 });
  });

  it('should update an employee detail', async () => {
    const employeeDetail = { position: 'Position Update' };
    const existingEmployeeDetail = new EmployeeDetail();
    existingEmployeeDetail.id = 1;

    jest.spyOn(employeeDetailRepository, 'findOne').mockResolvedValue(existingEmployeeDetail);
    jest.spyOn(employeeDetailRepository, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.updateDetail(1, employeeDetail)).toEqual({ affected: 1 });
  });

  it('should remove an employee and its details', async () => {
    const employee = new Employee();
    employee.id = 1;
    const detail = new EmployeeDetail();
    detail.id = 1;
    employee.employeeDetails = [detail];

    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(employee);
    jest.spyOn(employeeDetailRepository, 'update').mockResolvedValue({ affected: 1 } as any);
    jest.spyOn(employeeRepository, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
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