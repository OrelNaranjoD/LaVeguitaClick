import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { CreateProductDto } from '../../dto/product/create-product.dto';
import { ProductService } from '../../services/product/product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
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

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      description: 'Test',
      sku: '123',
      barcode: '123',
      price: 10,
      cost: 5,
      isActive: true,
      images: [{ id: 1 }],
      categories: [{ id: 1 }],
    };
    const product = { id: 1, ...dto };

    jest.spyOn(service, 'create').mockResolvedValueOnce(product as any);

    expect(await controller.create(dto)).toEqual(product);
  });

  it('should find all products', async () => {
    const product = { id: 1, name: 'Test' };
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([product as any]);

    expect(await controller.findAll()).toEqual([product]);
  });

  it('should find a product by id', async () => {
    const product = { id: 1, name: 'Test' };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(product as any);

    expect(await controller.findOne('1')).toEqual(product);
  });

  it('should update a product', async () => {
    const dto = { name: 'Test Updated' };
    jest.spyOn(service, 'update').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await controller.update('1', dto)).toEqual({ affected: 1 });
  });

  it('should remove a product', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await controller.remove('1')).toEqual({ affected: 1 });
  });
});