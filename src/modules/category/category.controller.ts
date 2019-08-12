import { Controller, Post, Body } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CategoryDto) {
    return await this.categoryService.create(data);
  }
}
