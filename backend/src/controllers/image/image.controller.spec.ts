import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { CreateImageDto } from '../../dto/image/create-image.dto';
import { ImageService } from '../../services/image/image.service';

describe('ImageController', () => {
  let controller: ImageController;
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        {
          provide: ImageService,
          useValue: {
            uploadImage: jest.fn(),
            findAll: jest.fn(),
            findAllByProduct: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImageController>(ImageController);
    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload an image', async () => {
    const dto: CreateImageDto = {
      alt: 'Test',
      url: 'test.jpg',
      productId: 1,
      categoryId: null,
    };
    const file = { filename: 'test.jpg' };
    const image = { id: 1, ...dto, url: file.filename };

    jest.spyOn(service, 'uploadImage').mockResolvedValueOnce(image as any);

    expect(await controller.uploadImage(1, file as any, dto)).toEqual(image);
  });

  it('should find all images', async () => {
    const image = { id: 1, alt: 'Test', url: 'test.jpg' };
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([image as any]);

    expect(await controller.findAll()).toEqual([image]);
  });

  it('should find all images by product id', async () => {
    const image = { id: 1, alt: 'Test', url: 'test.jpg' };
    jest.spyOn(service, 'findAllByProduct').mockResolvedValueOnce([image as any]);

    expect(await controller.findOne('1')).toEqual([image]);
  });

  it('should remove an image', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce({ affected: 1 } as any);

    expect(await controller.remove('1')).toEqual({ affected: 1 });
  });
});