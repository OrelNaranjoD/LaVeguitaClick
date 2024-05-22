import { Test, TestingModule } from '@nestjs/testing';
import { AuditAuthController } from './audit-auth.controller';
import { AuditAuthService } from '../../services/audit-auth/audit-auth.service';
import { CreateAuditAuthDto } from '../../dto/audit-auth/create-audit-auth.dto';

describe('AuditAuthController', () => {
  let controller: AuditAuthController;
  let service: AuditAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditAuthController],
      providers: [
        {
          provide: AuditAuthService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1 }),
            findAllTableName: jest.fn().mockResolvedValue([]),
            findAllAction: jest.fn().mockResolvedValue([]),
            findAllUserId: jest.fn().mockResolvedValue([]),
            findAllUserIdAndAction: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<AuditAuthController>(AuditAuthController);
    service = module.get<AuditAuthService>(AuditAuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an audit auth', async () => {
      const dto: CreateAuditAuthDto = {
        tableName: 'testTable',
        action: 'testAction',
        userId: 1,
        success: true,
        recordId: 123
      };
      expect(await controller.create(dto)).toEqual({ id: 1 });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAllTableName', () => {
    it('should return all audit auths with a specific table name', async () => {
      const tableName = 'testTable';
      expect(await controller.findAllTableName(tableName)).toEqual([]);
      expect(service.findAllTableName).toHaveBeenCalledWith(tableName);
    });
  });

  describe('findAllAction', () => {
    it('should return all audit auths with a specific action', async () => {
      const action = 'testAction';
      expect(await controller.findAllAction(action)).toEqual([]);
      expect(service.findAllAction).toHaveBeenCalledWith(action);
    });
  });

  describe('findAllUserId', () => {
    it('should return all audit auths with a specific user id', async () => {
      const userId = 1;
      expect(await controller.findAllUserId(userId)).toEqual([]);
      expect(service.findAllUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('findAllUserIdAndAction', () => {
    it('should return all audit auths with a specific user id and action', async () => {
      const userId = 1;
      const action = 'testAction';
      expect(await controller.findAllUserIdAndAction(userId, action)).toEqual([]);
      expect(service.findAllUserIdAndAction).toHaveBeenCalledWith(userId, action);
    });
  });
});