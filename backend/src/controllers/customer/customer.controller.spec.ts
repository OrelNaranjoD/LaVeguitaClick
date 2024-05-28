import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from '../../services/customer/customer.service';
import { CreateCustomerDto } from '../../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/customer/update-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer', () => {
    const dto = new CreateCustomerDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all customers', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one customer', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a customer', () => {
    const id = '1';
    const dto = new UpdateCustomerDto();
    controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a customer', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});