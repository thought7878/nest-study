import {
  Controller,
  Get,
  Req,
  Query,
  Headers,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { create } from 'domain';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  detail(@Param() params) {
    return {
      title: `post id: ${params.id}`,
    };
  }

  @Post()
  create(@Body() post: CreatePostDto) {
    this.demoService.create(post);
  }
}
