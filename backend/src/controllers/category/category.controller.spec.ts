import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';
import { CategoryService } from '../../services/category/category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const dto: CreateCategoryDto = {
      name: 'Test',
      description: 'Test',
      isActive: true,
      image: { id: 1 },
      parent: { id: 1 },
      children: [{ id: 2 }],
      products: [{ id: 1 }],
    };

    const category = { id: 1, ...dto };

    jest.spyOn(service, 'create').mockResolvedValueOnce(category as any);

    expect(await controller.create(dto)).toEqual(category);
  });

  it('should find all categories', async () => {
    const category = { id: 1, name: 'Test' };
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([category as any]);

    expect(await controller.findAll()).toEqual([category]);
  });

  it('should find a category by id', async () => {
    const category = { id: 1, name: 'Test' };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(category as any);

    expect(await controller.findOne('1')).toEqual(category);
  });

  it('should update a category', async () => {
    const dto = { name: 'Test Updated' };
    jest.spyOn(service, 'update').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await controller.update('1', dto)).toEqual({ affected: 1 });
  });

  it('should remove a category', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await controller.remove('1')).toEqual({ affected: 1 });
  });
});