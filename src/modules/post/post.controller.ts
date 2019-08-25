import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { QueryList } from '../../core/decorators/queryList.decorator';
import { QueryPagination } from '../../core/decorators/queryPagination.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  async insert(@Body() data: PostDto, @User() user: UserEntity) {
    return this.postService.insert(data, user);
  }
  @Get()
  async find(
    @QueryList('categories') categories: string[],
    @QueryList('tags') tags: string[],
    @QueryPagination() pagination,
  ) {
    return await this.postService.find(categories, tags, pagination);
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
  @Post(':id/vote')
  @UseGuards(AuthGuard())
  async vote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    await this.postService.vote(id, user);
  }
  @Delete(':id/vote')
  @UseGuards(AuthGuard())
  async unVote(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    await this.postService.unVote(id, user);
  }

  @Get(':id/collectors')
  async readCollectedUsers(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.readCollectedUsers(id);
  }
}
