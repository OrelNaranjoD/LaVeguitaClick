import { Injectable } from '@nestjs/common';
import { CreateImageDto } from '../../dto/image/create-image.dto';
import { Image } from '../../entities/image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {

  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) { }

  // Upload image
  async uploadImage(productId: number, file: Express.Multer.File, createImageDto: CreateImageDto): Promise<Image> {
    const imagePath = path.resolve(__dirname, '..', 'src', 'uploads', file.originalname);
    await fs.promises.writeFile(imagePath, file.buffer);

    const newImage = this.imageRepository.create({
      url: imagePath,
      product: { id: productId },
      ...createImageDto,
    });

    return this.imageRepository.save(newImage);
  }

  // Find all images
  findAll() {
    return this.imageRepository.find();
  }

  // Find images by id_product
  findAllByProduct(id: number) {
    return this.imageRepository.find({ where: { product: { id } } });
  }

  // Remove image
  remove(id: number) {
    return this.imageRepository.delete(id);
  }
}
