import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDto) {
    const entity = await this.userService.create(data);
    return entity;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findById(@Param('id') id) {
    const user = await this.userService.findById(id);
    return user;
  }
}
