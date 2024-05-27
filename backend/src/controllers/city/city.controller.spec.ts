import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CreateCityDto } from '../../dto/city/create-city.dto';
import { UpdateCityDto } from '../../dto/city/update-city.dto';
import { CityService } from '../../services/city/city.service';

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a city', () => {
    const dto = new CreateCityDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all cities', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one city', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a city', () => {
    const id = '1';
    const dto = new UpdateCityDto();
    controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a city', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});