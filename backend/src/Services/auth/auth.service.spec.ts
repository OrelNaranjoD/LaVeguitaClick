import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Privilege } from '../../entities/privilege.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user if valid username and password is provided', async () => {
      const user = new User();
      user.username = 'test';
      user.password = bcrypt.hashSync('password', 10);
      userService.findOneByUsername = jest.fn().mockResolvedValue(user);
      const result = await authService.validateUser('test', 'password');
      expect(result).toEqual(user);
    });

    it('should return null if invalid username or password is provided', async () => {
      userService.findOneByUsername = jest.fn().mockResolvedValue(null);
      const result = await authService.validateUser('test', 'wrong');
      expect(result).toBeNull();
    });

    it('should return null if valid username but invalid password is provided', async () => {
      const user = new User();
      user.username = 'test';
      user.password = bcrypt.hashSync('password', 10);
      userService.findOneByUsername = jest.fn().mockResolvedValue(user);
      const result = await authService.validateUser('test', 'wrong');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT when a valid user is provided', async () => {
      const user = new User();
      user.id = 1;
      user.username = 'test';
      user.roles = [];
      const jwt = 'test-jwt';
      jwtService.sign = jest.fn().mockReturnValue(jwt);
      const result = await authService.login(user);
      expect(result).toEqual({ access_token: jwt });
    });
  });

  it('should include privileges in the JWT payload when a user with roles and privileges is provided', async () => {
    const user = new User();
    user.id = 1;
    user.username = 'test';
    user.roles = [
      {
        id: 1,
        name: 'role1',
        description: 'description1',
        users: [],
        privileges: [
          Object.assign(new Privilege(), { name: 'privilege1' })
        ]
      },
      {
        id: 2,
        name: 'role2',
        description: 'description2',
        users: [],
        privileges: [
          Object.assign(new Privilege(), { name: 'privilege2' }),
          Object.assign(new Privilege(), { name: 'privilege3' })
        ]
      },
    ];
    const jwt = 'test-jwt';
    jwtService.sign = jest.fn().mockReturnValue(jwt);

    const result = await authService.login(user);

    expect(jwtService.sign).toHaveBeenCalledWith({
      username: user.username,
      sub: user.id,
      privileges: [
        Object.assign(new Privilege(), { name: 'privilege1' }),
        Object.assign(new Privilege(), { name: 'privilege2' }),
        Object.assign(new Privilege(), { name: 'privilege3' }),
      ],
    });
    expect(result).toEqual({ access_token: jwt });
  });
});