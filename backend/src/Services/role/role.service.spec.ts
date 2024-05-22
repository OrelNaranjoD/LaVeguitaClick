import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { Repository } from 'typeorm';

describe('RoleService', () => {
  let service: RoleService;
  let roleRepository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      const roleDto = {
        name: 'test',
        description: 'test description',
        users: [],
        privileges: []
      };
      const role = new Role();
      role.name = 'test';
      role.description = 'test description';
      role.users = [];
      role.privileges = [];

      jest.spyOn(roleRepository, 'create').mockReturnValue(role);
      jest.spyOn(roleRepository, 'save').mockResolvedValue(role);

      expect(await service.create(roleDto)).toEqual(role);
    });
  });

  describe('findAll', () => {
    it('should return all roles', async () => {
      const role = new Role();
      role.name = 'test';
      const roles = [role];

      jest.spyOn(roleRepository, 'find').mockResolvedValue(roles);

      expect(await service.findAll()).toEqual(roles);
    });
  });

  describe('findOne', () => {
    it('should return a role', async () => {
      const role = new Role();
      role.name = 'test';

      jest.spyOn(roleRepository, 'findOneBy').mockResolvedValue(role);

      expect(await service.findOne(1)).toEqual(role);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const roleDto = { name: 'test' };

      jest.spyOn(roleRepository, 'update').mockResolvedValue(undefined);

      expect(await service.update(1, roleDto)).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      jest.spyOn(roleRepository, 'delete').mockResolvedValue(undefined);

      expect(await service.remove(1)).toBeUndefined();
    });
  });
});