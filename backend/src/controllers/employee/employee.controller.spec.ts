import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { CreateEmployeeDto } from '../../dto/employee/create-employee.dto';
import { UpdateEmployeeDto } from '../../dto/employee/update-employee.dto';
import { UpdateEmployeeDetailDto } from '../../dto/employee/update-employee-detail.dto';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../entities/employee.entity';
import { UpdateResult } from 'typeorm';
import { EmployeeDetail } from '../../entities/employee-detail.entity';
import { CreateEmployeeDetailDto } from '../../dto/employee/create-employee-detail.dto';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const mockEmployeeRepository = {
      find: jest.fn().mockResolvedValue([new Employee(), new Employee()]),
      findOne: jest.fn().mockImplementation((id) => Promise.resolve(new Employee())),
      create: jest.fn().mockImplementation((dto) => Promise.resolve(new Employee())),
      save: jest.fn().mockImplementation((employee) => Promise.resolve(employee)),
    };

    const mockEmployeeDetailRepository = {
      find: jest.fn().mockResolvedValue([new EmployeeDetail(), new EmployeeDetail()]),
      findOne: jest.fn().mockImplementation((id) => Promise.resolve(new EmployeeDetail())),
      create: jest.fn().mockImplementation((dto) => Promise.resolve(new EmployeeDetail())),
      save: jest.fn().mockImplementation((detail) => Promise.resolve(detail)),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        EmployeeService,
        {
          provide: 'EmployeeRepository',
          useValue: mockEmployeeRepository,
        },
        {
          provide: 'EmployeeDetailRepository',
          useValue: mockEmployeeDetailRepository,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an employee', async () => {
    const dto = new CreateEmployeeDto();
    const employee = new Employee();
    jest.spyOn(service, 'create').mockResolvedValueOnce(employee);
    expect(await controller.create(dto)).toBe(employee);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should create an employee detail', async () => {
    const id = '1';
    const dto = new CreateEmployeeDetailDto();
    const employeeDetail = new EmployeeDetail();
    jest.spyOn(service, 'createDetail').mockResolvedValueOnce(employeeDetail);
    expect(await controller.createDetail(id, dto)).toBe(employeeDetail);
    expect(service.createDetail).toHaveBeenCalledWith(+id, dto);
  });

  it('should find all employees', async () => {
    const employees = [new Employee(), new Employee()];
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(employees);
    expect(await controller.findAll()).toBe(employees);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one employee', async () => {
    const employee = new Employee();
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(employee);
    expect(await controller.findOne('1')).toBe(employee);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an employee', async () => {
    const dto = new UpdateEmployeeDto();
    const updateResult = new UpdateResult();
    jest.spyOn(service, 'update').mockResolvedValueOnce(updateResult);
    expect(await controller.update('1', dto)).toBe(updateResult);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should update an employee detail', async () => {
    const dto = new UpdateEmployeeDetailDto();
    const updateResult = new UpdateResult();
    jest.spyOn(service, 'updateDetail').mockResolvedValueOnce(updateResult);
    expect(await controller.updateDetail('1', dto)).toBe(updateResult);
    expect(service.updateDetail).toHaveBeenCalledWith(1, dto);
  });

  it('should remove an employee', async () => {
    const updateResult = new UpdateResult();
    jest.spyOn(service, 'remove').mockResolvedValueOnce(updateResult);
    expect(await controller.remove('1')).toBe(updateResult);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

});