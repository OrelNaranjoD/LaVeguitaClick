import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from '../../entities/image.entity';
import { Repository } from 'typeorm';
import * as mockFs from 'mock-fs';
import * as path from 'path';


describe('ImageService', () => {
  let service: ImageService;
  let repo: Repository<Image>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        { provide: getRepositoryToken(Image), useClass: Repository },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
    repo = module.get<Repository<Image>>(getRepositoryToken(Image));

    const file = {
      originalname: 'test.jpg',
      buffer: Buffer.from('fake file content'),
    };
    const imagePath = path.resolve(__dirname, '..', 'src', 'uploads', file.originalname);
    mockFs({
      [path.resolve(__dirname, '..', 'src', 'uploads')]: {
        'test.jpg': 'fake file content',
      },
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload an image', async () => {
    const image = { id: 1, url: 'test.jpg', product: { id: 1 } };
    jest.spyOn(repo, 'create').mockReturnValueOnce(image as any);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(image as any);

    expect(await service.uploadImage(1, { originalname: 'test.jpg', buffer: Buffer.from('test') } as any, {} as any)).toEqual(image);
  });

  it('should find all images', async () => {
    const image = { id: 1, url: 'test.jpg', product: { id: 1 } };
    jest.spyOn(repo, 'find').mockResolvedValueOnce([image as any]);

    expect(await service.findAll()).toEqual([image]);
  });

  it('should find images by product id', async () => {
    const image = { id: 1, url: 'test.jpg', product: { id: 1 } };
    jest.spyOn(repo, 'find').mockResolvedValueOnce([image as any]);

    expect(await service.findAllByProduct(1)).toEqual([image]);
  });

  it('should remove an image', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await service.remove(1)).toEqual({ affected: 1 });
  });
});
