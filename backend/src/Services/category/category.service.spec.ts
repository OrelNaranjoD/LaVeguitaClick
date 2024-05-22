import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let repo: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: getRepositoryToken(Category), useClass: Repository },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repo = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const dto: CreateCategoryDto = {
      name: 'Test',
      description: 'Test description',
      isActive: true,
      image: { id: 1 },
      parent: { id: 1 },
      children: [{ id: 2 }, { id: 3 }],
      products: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    const category = { id: 1, ...dto };

    jest.spyOn(repo, 'create').mockReturnValueOnce(category as any);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(category as any);

    expect(await service.create(dto)).toEqual(category);
  });

  it('should find all categories', async () => {
    const category = { id: 1, name: 'Test', description: 'Test description', isActive: true };
    jest.spyOn(repo, 'find').mockResolvedValueOnce([category as any]);

    expect(await service.findAll()).toEqual([category]);
  });

  it('should find a category by id', async () => {
    const category = { id: 1, name: 'Test', description: 'Test description', isActive: true };
    jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(category as any);

    expect(await service.findOne(1)).toEqual(category);
  });

  it('should update a category', async () => {
    const dto = { name: 'Updated' };
    jest.spyOn(repo, 'update').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await service.update(1, dto)).toEqual({ affected: 1 });
  });

  it('should remove a category', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});