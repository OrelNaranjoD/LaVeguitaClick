import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { User } from '../../entities/user.entity';
import { Account } from '../../entities/account.entity';
import { Role } from '../../entities/role.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(new User()),
            findAll: jest.fn().mockResolvedValue([new User()]),
            findOneByUsername: jest.fn().mockResolvedValue(new User()),
            update: jest.fn().mockResolvedValue(new User()),
            remove: jest.fn().mockResolvedValue(new User()),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      username: 'test',
      password: 'test',
      email: 'test@test.com',
      account: new Account(),
      roles: [new Role()],
    };

    expect(await controller.create(dto)).toBeInstanceOf(User);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    expect(await controller.findAll()).toBeInstanceOf(Array);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one user by username', async () => {
    const username = 'test';
    expect(await controller.findOneByUsername(username)).toBeInstanceOf(User);
    expect(service.findOneByUsername).toHaveBeenCalledWith(username);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = {
      username: 'updatedTest',
      email: 'updatedTest@test.com',
      roles: [new Role()],
    };

    const id = '1';
    expect(await controller.update(id, dto)).toBeInstanceOf(User);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a user', async () => {
    const id = '1';
    expect(await controller.remove(id)).toBeInstanceOf(User);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});