import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { CountryService } from '../../services/country/country.service';
import { CreateCountryDto } from '../../dto/country/create-country.dto';
import { UpdateCountryDto } from '../../dto/country/update-country.dto';

describe('CountryController', () => {
  let controller: CountryController;
  let service: CountryService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CountryController>(CountryController);
    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a country', () => {
    const dto = new CreateCountryDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all countries', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one country', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a country', () => {
    const id = '1';
    const dto = new UpdateCountryDto();
    controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a country', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});