import { Test, TestingModule } from '@nestjs/testing';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeService } from '../../services/privilege/privilege.service';
import { CreatePrivilegeDto } from '../../dto/privilege/create-privilege.dto';
import { UpdatePrivilegeDto } from '../../dto/privilege/update-privilege.dto';

describe('PrivilegeController', () => {
  let controller: PrivilegeController;
  let service: PrivilegeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivilegeController],
      providers: [
        { provide: PrivilegeService, useValue: { create: jest.fn(), findAll: jest.fn(), findOne: jest.fn(), update: jest.fn(), remove: jest.fn() } },
      ],
    }).compile();

    controller = module.get<PrivilegeController>(PrivilegeController);
    service = module.get<PrivilegeService>(PrivilegeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a privilege', async () => {
      const dto = new CreatePrivilegeDto();
      controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should find all privileges', async () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find one privilege', async () => {
      const id = '1';
      controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a privilege', async () => {
      const id = '1';
      const dto = new UpdatePrivilegeDto();
      controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a privilege', async () => {
      const id = '1';
      controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});