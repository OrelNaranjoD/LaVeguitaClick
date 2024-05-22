import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../../services/account/account.service';
import { CreateAccountDto } from '../../dto/account/create-account.dto';
import { UpdateAccountDto } from '../../dto/account/update-account.dto';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        { provide: AccountService, useValue: { create: jest.fn(), findActive: jest.fn(), update: jest.fn() } },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an account', async () => {
      const dto = new CreateAccountDto();
      controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findActive', () => {
    it('should find an active account', async () => {
      const id = '1';
      controller.findActive(id);
      expect(service.findActive).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update an account', async () => {
      const id = '1';
      const dto = new UpdateAccountDto();
      controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });
});