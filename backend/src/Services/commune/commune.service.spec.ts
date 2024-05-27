import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommuneService } from './commune.service';
import { Commune } from '../../entities/commune.entity';

describe('CommuneService', () => {
  let service: CommuneService;
  let repo: Repository<Commune>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommuneService,
        { provide: getRepositoryToken(Commune), useClass: Repository },
      ],
    }).compile();

    service = module.get<CommuneService>(CommuneService);
    repo = module.get<Repository<Commune>>(getRepositoryToken(Commune));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a commune', async () => {
    const commune = { id: 1, name: 'Commune Name', cityId: 1};
    jest.spyOn(repo, 'create').mockImplementation(() => commune as any);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(commune as any));

    expect(await service.create(commune)).toEqual(commune);
  });

  it('should find all communes', async () => {
    const communes = [{ id: 1, name: 'Commune Name' }];
    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(communes as any));

    expect(await service.findAll()).toEqual(communes);
  });

  it('should find one commune', async () => {
    const commune = { id: 1, name: 'Commune Name' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(commune as any);

    expect(await service.findOne(1)).toEqual(commune);
  });

  it('should update a commune', async () => {
    const commune = { id: 1, name: 'Commune Name' };
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, commune)).toEqual({ affected: 1 });
  });

  it('should remove a commune', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});