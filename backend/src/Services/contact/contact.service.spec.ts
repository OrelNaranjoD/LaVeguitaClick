import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactService } from './contact.service';
import { Contact } from '../../entities/contact.entity';

describe('ContactService', () => {
  let service: ContactService;
  let repo: Repository<Contact>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        { provide: getRepositoryToken(Contact), useClass: Repository },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    repo = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact', async () => {
    const contact = {
      id: 1,
      first_name: 'First Name',
      last_name: 'Last Name',
      position: 'Position',
      phone: '1234567890',
      email: 'contact@example.com'
    };
    jest.spyOn(repo, 'create').mockImplementation(() => contact as any);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(contact as any));

    expect(await service.create(contact)).toEqual(contact);
  });

  it('should find all contacts', async () => {
    const contacts = [{ id: 1, name: 'Contact Name', email: 'contact@example.com' }];
    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(contacts as any));

    expect(await service.findAll()).toEqual(contacts);
  });

  it('should find one contact', async () => {
    const contact = { id: 1, name: 'Contact Name', email: 'contact@example.com' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(contact as any);

    expect(await service.findOne(1)).toEqual(contact);
  });

  it('should update a contact', async () => {
    const contact = { id: 1, name: 'Contact Name', email: 'contact@example.com' };
    jest.spyOn(repo, 'update').mockResolvedValue({ affected: 1 } as any);

    expect(await service.update(1, contact)).toEqual({ affected: 1 });
  });

  it('should remove a contact', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});