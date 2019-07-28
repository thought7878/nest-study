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
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { create } from 'domain';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { LoggingInterceptor } from '../../core/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { ErrorInterceptor } from '../../core/interceptors/error/error.interceptor';
import { User } from '../../core/decorators/user.decorator';

@Controller('posts')
// @UseGuards(DemoAuthGuard)
// @UseFilters(DemoFilter)
// @UseInterceptors(LoggingInterceptor)
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  // @UseInterceptors(TransformInterceptor)
  @UseInterceptors(ErrorInterceptor)
  index() {
    // return this.demoService.findAll();
    throw new ForbiddenException();
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
  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  // @UseFilters(DemoFilter)
  create(@Body() post: CreatePostDto, @User('data param') user) {
    // throw new HttpException('没有权限！', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限forbidden');
    // console.log('create method');
    console.log(user);

    this.demoService.create(post);
  }
}
