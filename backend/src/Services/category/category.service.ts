import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../../dto/category/update-category.dto';
import { Category } from '../../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  // Create category
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  // Find all categories
  findAll() {
    return this.categoryRepository.find();
  }

  // Find category by id
  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id: id });
  }

  // Update category
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  // Remove category
  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
