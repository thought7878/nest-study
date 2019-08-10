import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  async insert(@Body() data: PostDto) {
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
  async update(@Param('id') id: string, @Body() data: Partial<PostDto>) {
    return await this.postService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postService.delete(id);
  }
}
