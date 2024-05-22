import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrivilegeService } from './privilege.service';
import { Privilege } from '../../entities/privilege.entity';
import { CreatePrivilegeDto } from '../../dto/privilege/create-privilege.dto';
import { UpdatePrivilegeDto } from '../../dto/privilege/update-privilege.dto';

describe('PrivilegeService', () => {
  let service: PrivilegeService;
  let repo: Repository<Privilege>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrivilegeService,
        {
          provide: getRepositoryToken(Privilege),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PrivilegeService>(PrivilegeService);
    repo = module.get<Repository<Privilege>>(getRepositoryToken(Privilege));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a privilege', async () => {
      const dto: CreatePrivilegeDto = {
        name: 'Test Privilege',
        description: 'This is a test privilege',
        roles: [],
      };
      const privilege = new Privilege();
      jest.spyOn(repo, 'create').mockReturnValue(privilege);
      jest.spyOn(repo, 'save').mockResolvedValue(privilege);

      expect(await service.create(dto)).toEqual(privilege);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(privilege);
    });
  });

  describe('findAll', () => {
    it('should return all privileges', async () => {
      const result = [new Privilege()];
      jest.spyOn(repo, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one privilege', async () => {
      const id = 1;
      const privilege = new Privilege();
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(privilege);

      expect(await service.findOne(id)).toEqual(privilege);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: id });
    });
  });

  describe('update', () => {
    it('should update a privilege', async () => {
      const id = 1;
      const dto: UpdatePrivilegeDto = {
        name: 'Updated Privilege',
        description: 'This is an updated test privilege',
        roles: [],
      };
      jest.spyOn(repo, 'update').mockResolvedValue(undefined);

      expect(await service.update(id, dto)).toBeUndefined();
      expect(repo.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a privilege', async () => {
      const id = 1;
      jest.spyOn(repo, 'delete').mockResolvedValue(undefined);

      expect(await service.remove(id)).toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith(id);
    });
  });
});