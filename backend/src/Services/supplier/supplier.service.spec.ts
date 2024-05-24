import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierService } from './supplier.service';
import { Supplier } from '../../entities/supplier.entity';

describe('SupplierService', () => {
  let service: SupplierService;
  let repo: Repository<Supplier>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        { provide: getRepositoryToken(Supplier), useClass: Repository },
      ],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
    repo = module.get<Repository<Supplier>>(getRepositoryToken(Supplier));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a supplier', async () => {
    const supplier = {
      id: 1,
      rut: '12345678-9',
      company_name: 'Company Name',
      phone: '1234567890',
      email: 'supplier@example.com',
      description: 'Supplier Description',
      is_active: true,
      is_deleted: undefined,
      contacts: [
        {
          id: 1,
          first_name: 'Contact First Name',
          last_name: 'Contact Last Name',
          position: 'Contact Position',
          phone: '1234567890',
          email: 'contact@example.com'
        }
      ],
      address: [
        {
          id: 1,
          street: 'Street',
          postal_code: 'Postal Code',
          zip_code: 'Zip Code',
          latitude: 0,
          longitude: 0,
          communeId: 1
        }
      ],
    };
    jest.spyOn(repo, 'create').mockImplementation(() => supplier as any);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(supplier as any));

    expect(await service.create(supplier)).toEqual(supplier);
  });

  it('should find all suppliers', async () => {
    const suppliers = [{ id: 1, name: 'Supplier Name' }];
    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(suppliers as any));

    expect(await service.findAll()).toEqual(suppliers);
  });

  it('should find one supplier', async () => {
    const supplier = { id: 1 };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(supplier as any);

    expect(await service.findOne(1)).toEqual(supplier);
  });

  it('should update a supplier', async () => {
    const supplier = { company_name: 'Company Name Update' };
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, supplier)).toEqual({ affected: 1 });
  });

  it('should remove a supplier', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});