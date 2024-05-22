import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditAuthService } from './audit-auth.service';
import { AuditAuth } from '../../entities/audit-auth.entity';
import { CreateAuditAuthDto } from '../../dto/audit-auth/create-audit-auth.dto';

describe('AuditAuthService', () => {
  let service: AuditAuthService;
  let repo: Repository<AuditAuth>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditAuthService,
        {
          provide: getRepositoryToken(AuditAuth),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuditAuthService>(AuditAuthService);
    repo = module.get<Repository<AuditAuth>>(getRepositoryToken(AuditAuth));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      const auditAuth = new AuditAuth();
      jest.spyOn(repo, 'create').mockReturnValue(auditAuth);
      jest.spyOn(repo, 'save').mockResolvedValue(auditAuth);

      expect(await service.create(dto)).toEqual(auditAuth);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(auditAuth);
    });
  });

  describe('findAllTableName', () => {
    it('should return all audit auths with a specific table name', async () => {
      const tableName = 'testTable';
      jest.spyOn(repo, 'find').mockResolvedValue([]);

      expect(await service.findAllTableName(tableName)).toEqual([]);
      expect(repo.find).toHaveBeenCalledWith({ where: { tableName } });
    });
  });

  describe('findAllAction', () => {
    it('should return all audit auths with a specific action', async () => {
      const action = 'testAction';
      jest.spyOn(repo, 'find').mockResolvedValue([]);

      expect(await service.findAllAction(action)).toEqual([]);
      expect(repo.find).toHaveBeenCalledWith({ where: { action } });
    });
  });

  describe('findAllUserId', () => {
    it('should return all audit auths with a specific user id', async () => {
      const userId = 1;
      jest.spyOn(repo, 'find').mockResolvedValue([]);

      expect(await service.findAllUserId(userId)).toEqual([]);
      expect(repo.find).toHaveBeenCalledWith({ where: { userId: userId }, relations: ["user"] });
    });
  });

  describe('findAllUserIdAndAction', () => {
    it('should return all audit auths with a specific user id and action', async () => {
      const userId = 1;
      const action = 'testAction';
      jest.spyOn(repo, 'find').mockResolvedValue([]);

      expect(await service.findAllUserIdAndAction(userId, action)).toEqual([]);
      expect(repo.find).toHaveBeenCalledWith({ where: { userId: userId, action: action }, relations: ["user"] });
    });
  });
});