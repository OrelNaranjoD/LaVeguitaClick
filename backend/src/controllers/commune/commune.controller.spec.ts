import { Test, TestingModule } from '@nestjs/testing';
import { CommuneController } from './commune.controller';
import { CreateCommuneDto } from '../../dto/commune/create-commune.dto';
import { UpdateCommuneDto } from '../../dto/commune/update-commune.dto';
import { CommuneService } from '../../services/commune/commune.service';

describe('CommuneController', () => {
  let controller: CommuneController;
  let service: CommuneService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommuneController],
      providers: [
        {
          provide: CommuneService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CommuneController>(CommuneController);
    service = module.get<CommuneService>(CommuneService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a commune', () => {
    const dto = new CreateCommuneDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all communes', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one commune', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a commune', () => {
    const id = '1';
    const dto = new UpdateCommuneDto();
    controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a commune', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});