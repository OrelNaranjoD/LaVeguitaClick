import { Test, TestingModule } from '@nestjs/testing';
import { RegionController } from './region.controller';
import { RegionService } from '../../services/region/region.service';
import { CreateRegionDto } from '../../dto/region/create-region.dto';
import { UpdateRegionDto } from '../../dto/region/update-region.dto';

describe('RegionController', () => {
  let controller: RegionController;
  let service: RegionService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionController],
      providers: [
        {
          provide: RegionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RegionController>(RegionController);
    service = module.get<RegionService>(RegionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a region', () => {
    const dto = new CreateRegionDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all regions', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one region', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a region', () => {
    const id = '1';
    const dto = new UpdateRegionDto();
    controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a region', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});