import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from './customer.service';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerDto } from '../../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/customer/update-customer.dto';
import { Address } from '../../entities/address.entity';

describe('CustomerService', () => {
  let service: CustomerService;
  let repo: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: getRepositoryToken(Customer), useClass: Repository },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repo = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const dto: CreateCustomerDto = {
      run: '12345678-5',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: [
        {
          street: 'Street',
          zip_code: 'Zip Code',
          latitude: 0,
          longitude: 0,
          communeId: 1
        }
      ],
      is_active: true,
      is_deleted: false
    };
    const customer = new Customer();
    jest.spyOn(repo, 'create').mockReturnValue(customer);
    jest.spyOn(repo, 'save').mockResolvedValue(customer);

    expect(await service.create(dto)).toEqual(customer);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(customer);
  });

it('should find all customers', async () => {
  const result: Customer[] = [new Customer()];
  jest.spyOn(repo, 'find').mockResolvedValue(result);

  expect(await service.findAll()).toEqual(result);
});

it('should find one customer', async () => {
  const id = 1;
  const result = new Customer();
  jest.spyOn(repo, 'findOneBy').mockResolvedValue(result);

  expect(await service.findOne(id)).toEqual(result);
});

it('should update a customer', async () => {
  const id = 1;
  const updateDto: UpdateCustomerDto = {
    first_name: 'Jane',
  };
  jest.spyOn(repo, 'update').mockResolvedValue(undefined);

  expect(await service.update(id, updateDto)).toBeUndefined();
  expect(repo.update).toHaveBeenCalledWith(id, updateDto);
});

  it('should disable a customer', async () => {
    const id = 1;
    jest.spyOn(repo, 'update').mockResolvedValue(undefined);

    expect(await service.remove(id)).toBeUndefined();
    expect(repo.update).toHaveBeenCalledWith(id, { is_deleted: true });
  });
});