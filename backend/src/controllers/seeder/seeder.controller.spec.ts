import { Test, TestingModule } from '@nestjs/testing';
import { SeederController } from './seeder.controller';
import { SeederService } from '../../services/seeder/seeder.service';

describe('SeederController', () => {
  let controller: SeederController;
  let service: SeederService;

  beforeEach(async () => {
    const mockService = {
      seed: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeederController],
      providers: [
        {
          provide: SeederService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SeederController>(SeederController);
    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the seed method of the service', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.seed(res as any);

    expect(service.seed).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Data seeded successfully!' });
  });

  it('should return the error message', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (service.seed as jest.Mock).mockRejectedValueOnce(new Error('Data seeding failed! Error: Seed failed'));

    await controller.seed(res as any);

    expect(service.seed).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Data seeding failed! Error: Seed failed' });
  });
});