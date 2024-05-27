import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityService } from './city.service';
import { City } from '../../entities/city.entity';

describe('CityService', () => {
  let service: CityService;
  let repo: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        { provide: getRepositoryToken(City), useClass: Repository },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    repo = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a city', async () => {
    const city = { id: 1, name: 'City Name', regionId: 1 };
    jest.spyOn(repo, 'create').mockImplementation(() => city as any);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(city as any));

    expect(await service.create(city)).toEqual(city);
  });

  it('should find all cities', async () => {
    const cities = [{ id: 1, name: 'City Name' }];
    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(cities as any));

    expect(await service.findAll()).toEqual(cities);
  });

  it('should find one city', async () => {
    const city = { id: 1, name: 'City Name' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(city as any);

    expect(await service.findOne(1)).toEqual(city);
  });

  it('should update a city', async () => {
    const city = { id: 1, name: 'City Name' };
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, city)).toEqual({ affected: 1 });
  });

  it('should remove a city', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});