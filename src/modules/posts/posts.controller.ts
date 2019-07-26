import {
  Controller,
  Get,
  Req,
  Query,
  Headers,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ForbiddenException,
  UseFilters,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { create } from 'domain';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';

@Controller('posts')
@UseGuards(DemoAuthGuard)
// @UseFilters(DemoFilter)
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id) {
    console.log('id:', typeof id);

    return {
      title: `post id: ${id}`,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  // @UseFilters(DemoFilter)
  create(@Body() post: CreatePostDto) {
    // throw new HttpException('没有权限！', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限forbidden');
    this.demoService.create(post);
  }
}
