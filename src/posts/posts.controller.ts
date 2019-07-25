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

@Controller('posts')
export class PostsController {
  @Get()
  index(@Headers('authorization') headers) {
    // console.log(request.ip, request.hostname, request.method);
    console.log(headers);

    return {
      title: 'hello nest',
      author: 'liang',
    };
  }

  @Get(':id')
  detail(@Param() params) {
    return {
      title: `post id: ${params.id}`,
    };
  }

  @Post()
  create(@Body() body) {
    console.log(body);
  }
}
