import { Module } from '@nestjs/common';
import { ProductService } from '../services/product/product.service';
import { ProductController } from '../controllers/product/product.controller';
import { Product } from '../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
