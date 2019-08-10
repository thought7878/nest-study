import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePwdDto } from './user.dto';

@Controller('user')
// @UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDto) {
    const entity = await this.userService.create(data);
    return entity;
  }

  @Get(':id')
  async findById(@Param('id') id) {
    const user = await this.userService.findById(id);
    return user;
  }

  @Put('password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() passwords: UpdatePwdDto,
  ) {
    return await this.userService.updatePassword(id, passwords);
  }
}
