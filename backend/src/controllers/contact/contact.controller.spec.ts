import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from '../../services/contact/contact.service';
import { CreateContactDto } from '../../dto/contact/create-contact.dto';
import { UpdateContactDto } from '../../dto/contact/update-contact.dto';

describe('ContactController', () => {
  let controller: ContactController;
  let service: ContactService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a contact', () => {
    const dto = new CreateContactDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all contacts', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one contact', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a contact', () => {
    const id = '1';
    const dto = new UpdateContactDto();
    controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a contact', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});