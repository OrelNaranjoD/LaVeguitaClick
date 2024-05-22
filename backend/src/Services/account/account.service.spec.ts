import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from './account.service';
import { Account } from '../../entities/account.entity';
import { User } from '../../entities/user.entity';
import { CreateAccountDto } from '../../dto/account/create-account.dto';
import { UpdateAccountDto } from '../../dto/account/update-account.dto';

describe('AccountService', () => {
  let service: AccountService;
  let repo: Repository<Account>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repo = module.get<Repository<Account>>(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an account', async () => {
      const user: User = {
        id: 1,
        username: 'test',
        password: 'test',
        email: 'test@test.com',
        account: null,
        roles: []
      };
      const dto: CreateAccountDto = {
        isActive: true,
        user: user,
      };
      const account = new Account();
      jest.spyOn(repo, 'create').mockReturnValue(account);
      jest.spyOn(repo, 'save').mockResolvedValue(account);

      expect(await service.create(dto)).toEqual(account);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(account);
    });
  });

  describe('findActive', () => {
    it('should return an active account', async () => {
      const id = 1;
      const account = new Account();
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(account);

      expect(await service.findActive(id)).toEqual(account);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: id });
    });
  });

  describe('update', () => {
    it('should update an account', async () => {
      const id = 1;
      const dto: UpdateAccountDto = {
        isActive: false
      };
      jest.spyOn(repo, 'update').mockResolvedValue(undefined);

      expect(await service.update(id, dto)).toBeUndefined();
      expect(repo.update).toHaveBeenCalledWith(id, dto);
    });
  });
});