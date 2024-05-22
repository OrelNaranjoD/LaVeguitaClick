import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { Account } from '../../entities/account.entity';
import { In } from 'typeorm';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: any;
  let roleRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: { find: jest.fn(), findOne: jest.fn(), findOneBy: jest.fn(), save: jest.fn(), remove: jest.fn() } },
        { provide: getRepositoryToken(Role), useValue: { find: jest.fn() } },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
    roleRepository = module.get(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const account = new Account();
      account.id = 1;
      account.isActive = true;

      const role1 = new Role();
      role1.id = 1;
      role1.name = 'testRole1';

      const user: CreateUserDto = {
        username: 'test',
        password: 'test',
        email: 'test@test.com',
        roles: [role1],
        account: account
      };

      const savedUser = new User();
      savedUser.id = 1;
      savedUser.username = 'test';
      savedUser.email = 'test@test.com';
      savedUser.roles = [role1];
      savedUser.account = account;

      roleRepository.find.mockImplementation(() => Promise.resolve([role1]));
      userRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(user);

      expect(result).toEqual({ id: 1, username: 'test', email: 'test@test.com', roles: [role1], account: account });
      expect(userRepository.save).toHaveBeenCalled();
      expect(roleRepository.find).toHaveBeenCalledWith({ where: { id: In([role1]) } });
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const users = [{ id: 1, username: 'test', email: 'test@test.com', roles: [] }];
      userRepository.find.mockResolvedValue(users);
      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user', async () => {
      const user = new User();
      user.id = 1;
      user.username = 'test';
      user.email = 'test@test.com';
      user.roles = [];

      userRepository.findOne.mockResolvedValue(user);
      expect(await service.findOneByUsername('test')).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { username: 'test' }, relations: ['roles', 'roles.privileges'] });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = new User();
      user.id = 1;
      user.username = 'test';
      user.email = 'test@test.com';
      user.roles = [];

      const role1 = new Role();
      role1.id = 1;
      role1.name = 'testRole1';

      const updateUserDto: UpdateUserDto = {
        username: 'test',
        password: 'test',
        email: 'test@test.com',
        roles: [role1]
      };

      const roleIds = updateUserDto.roles.map(role => role.id);

      userRepository.findOneBy.mockResolvedValue(user);
      roleRepository.find.mockImplementation(({ where: { id } }) => {
        if (id._value.includes(role1.id)) {
          return Promise.resolve([role1]);
        }
        return Promise.resolve([]);
      });
      userRepository.save.mockResolvedValue({ ...user, roles: [role1] });

      const result = await service.update(1, updateUserDto);

      expect(result).toEqual({ id: 1, username: 'test', email: 'test@test.com', roles: [role1] });
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(roleRepository.find).toHaveBeenCalledWith({ where: { id: In(roleIds) } });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = new User();
      user.id = 1;
      user.username = 'test';
      user.email = 'test@test.com';
      user.roles = [];

      userRepository.findOneBy.mockResolvedValue(user);
      userRepository.remove.mockResolvedValue(user);

      const result = await service.remove(1);

      expect(result).toEqual({ id: 1, username: 'test', email: 'test@test.com', roles: [] });
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(userRepository.remove).toHaveBeenCalledWith(user);
    });
  });
});