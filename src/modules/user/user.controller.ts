import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePwdDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { User as UserEntity } from './user.entity';

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
    console.log('findById');

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

  @Get('collect/:userId')
  async readCollectedPosts(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.readCollectedPosts(userId);
  }
}
