import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionService } from './region.service';
import { Region } from '../../entities/region.entity';

describe('RegionService', () => {
  let service: RegionService;
  let repo: Repository<Region>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionService,
        { provide: getRepositoryToken(Region), useClass: Repository },
      ],
    }).compile();

    service = module.get<RegionService>(RegionService);
    repo = module.get<Repository<Region>>(getRepositoryToken(Region));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a region', async () => {
    const region = { id: 1, name: 'Region Name', countryId: 1 };
    jest.spyOn(repo, 'create').mockImplementation(() => region as any);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(region as any));

    expect(await service.create(region)).toEqual(region);
  });

  it('should find all regions', async () => {
    const regions = [{ id: 1, name: 'Region Name' }];
    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(regions as any));

    expect(await service.findAll()).toEqual(regions);
  });

  it('should find one region', async () => {
    const region = { id: 1, name: 'Region Name' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(region as any);

    expect(await service.findOne(1)).toEqual(region);
  });

  it('should update a region', async () => {
    const region = { id: 1, name: 'Region Name' };
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, region)).toEqual({ affected: 1 });
  });

  it('should remove a region', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});