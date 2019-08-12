import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: CategoryDto) {
    const entity = this.categoryRepository.create(data);
    return await this.categoryRepository.save(entity);
  }
}
