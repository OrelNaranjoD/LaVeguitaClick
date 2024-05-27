import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from '../../services/address/address.service';
import { CreateAddressDto } from '../../dto/address/create-address.dto';
import { UpdateAddressDto } from '../../dto/address/update-address.dto';

describe('AddressController', () => {
  let controller: AddressController;
  let service: AddressService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an address', () => {
    const dto = new CreateAddressDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all addresses', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one address', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update an address', () => {
    const id = '1';
    const dto = new UpdateAddressDto();
    controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove an address', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});