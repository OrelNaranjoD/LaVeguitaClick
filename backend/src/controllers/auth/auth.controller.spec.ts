import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from '../../dto/auth/login-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT when credentials are valid', async () => {
      const loginAuthDto: LoginAuthDto = { username: 'test', password: 'test' };
      const jwt = { access_token: 'jwt' };

      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(true);
      jest.spyOn(authService, 'login').mockResolvedValueOnce(jwt);

      expect(await controller.login(loginAuthDto)).toBe(jwt);
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const loginAuthDto: LoginAuthDto = { username: 'test', password: 'test' };

      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(null);

      await expect(controller.login(loginAuthDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});