import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from './address.service';
import { Address } from '../../entities/address.entity';
import { Commune } from '../../entities/commune.entity';

describe('AddressService', () => {
  let service: AddressService;
  let repo: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: getRepositoryToken(Address), useClass: Repository },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repo = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an address', async () => {
    const address = { id: 1, street: '123 Main St', zip_code: '12345', latitude: 1.23, longitude: 4.56, created_at: new Date(), modified_at: new Date(), communeId: 1 };
    const savedAddress = { ...address, commune: new Commune() };
    jest.spyOn(repo, 'create').mockImplementation(() => savedAddress as any);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(savedAddress as any));

    expect(await service.create(address)).toEqual(savedAddress);
  });

  it('should find all addresses', async () => {
    const addresses = [{ id: 1, street: '123 Main St', zip_code: '12345', latitude: 1.23, longitude: 4.56, created_at: new Date(), modified_at: new Date(), commune: new Commune() }];
    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(addresses as any));

    expect(await service.findAll()).toEqual(addresses);
  });

  it('should find one address', async () => {
    const address = { id: 1, street: '123 Main St', zip_code: '12345', latitude: 1.23, longitude: 4.56, created_at: new Date(), modified_at: new Date(), commune: new Commune() };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(address as any);

    expect(await service.findOne(1)).toEqual(address);
  });

  it('should update an address', async () => {
    const address = { id: 1, street: '123 Main St', zip_code: '12345', latitude: 1.23, longitude: 4.56, created_at: new Date(), modified_at: new Date(), commune: new Commune() };
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, address)).toEqual({ affected: 1 });
  });

  it('should remove an address', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});