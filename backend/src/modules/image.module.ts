import { Module } from '@nestjs/common';
import { ImageService } from '../services/image/image.service';
import { ImageController } from '../controllers/image/image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
