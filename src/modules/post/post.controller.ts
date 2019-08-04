import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async insert(@Body() data) {
    return this.postService.insert(data);
  }
  @Get()
  async find() {
    return await this.postService.find();
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.postService.findById(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() data) {
    return await this.postService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postService.delete(id);
  }
}
