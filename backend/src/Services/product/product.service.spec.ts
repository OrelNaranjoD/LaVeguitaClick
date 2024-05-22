import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../dto/product/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getRepositoryToken(Product), useClass: Repository },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      price: 100,
      cost: 50,
      description: 'Test product',
      sku: 'TEST001',
      barcode: '1234567890123',
      isActive: true,
      images: [{ id: 1 }, { id: 2 }],
      categories: [{ id: 1 }, { id: 2 }],
    };
    const product = { id: 1, ...dto };

    jest.spyOn(repo, 'create').mockReturnValueOnce(product as any);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(product as any);

    expect(await service.create(dto)).toEqual(product);
  });

  it('should find all products', async () => {
    const product = { id: 1, name: 'Test', price: 100 };
    jest.spyOn(repo, 'find').mockResolvedValueOnce([product as any]);

    expect(await service.findAll()).toEqual([product]);
  });

  it('should find a product by id', async () => {
    const product = { id: 1, name: 'Test', price: 100 };
    jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(product as any);

    expect(await service.findOne(1)).toEqual(product);
  });

  it('should update a product', async () => {
    const dto = { name: 'Test Updated', price: 150 };
    jest.spyOn(repo, 'update').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await service.update(1, dto)).toEqual({ affected: 1 });
  });

  it('should remove a product', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});