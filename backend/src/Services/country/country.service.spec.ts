import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from './country.service';
import { Country } from '../../entities/country.entity';

describe('CountryService', () => {
  let service: CountryService;
  let repo: Repository<Country>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        { provide: getRepositoryToken(Country), useClass: Repository },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    repo = module.get<Repository<Country>>(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a country', async () => {
    const country = { id: 1, name: 'Country Name', iso2: 'CN' };
    jest.spyOn(repo, 'create').mockImplementation(() => country as any);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(country as any));

    expect(await service.create(country)).toEqual(country);
  });

  it('should find all countries', async () => {
    const countries = [{ id: 1, name: 'Country Name' }];
    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(countries as any));

    expect(await service.findAll()).toEqual(countries);
  });

  it('should find one country', async () => {
    const country = { id: 1, name: 'Country Name' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(country as any);

    expect(await service.findOne(1)).toEqual(country);
  });

  it('should update a country', async () => {
    const country = { id: 1, name: 'Country Name' };
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, country)).toEqual({ affected: 1 });
  });

  it('should remove a country', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});