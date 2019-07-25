import { Controller, Get, Req, Query, Headers } from '@nestjs/common';

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
}
