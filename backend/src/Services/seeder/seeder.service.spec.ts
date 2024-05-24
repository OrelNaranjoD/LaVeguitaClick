import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../entities/country.entity';
import { Region } from '../../entities/region.entity';
import { City } from '../../entities/city.entity';
import { Commune } from '../../entities/commune.entity';

describe('SeederService', () => {
  let service: SeederService;
  let mockRepository: Repository<any>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        {
          provide: getRepositoryToken(Country),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Region),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(City),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Commune),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should seed data', async () => {
    await service.seed();

    expect(mockRepository.save).toHaveBeenCalledTimes(4);
  });

  it('should throw an error when seeding fails', async () => {
    jest.spyOn(mockRepository, 'save').mockImplementation(() => {
      throw new Error('Database error');
    });

    try {
      await service.seed();
      fail('Expected service.seed() to throw an error, but it succeeded');
    } catch (error) {
      expect(error.message).toBe('Data seeding failed! Error: Database error');
    }
  });

});