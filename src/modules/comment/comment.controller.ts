import {
  Controller,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { CommentService } from './comment.service';
import { CommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  @UseGuards(AuthGuard())
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: UserEntity,
    @Body() comment: CommentDto,
  ) {
    return await this.commentService.create(postId, user, comment);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: CommentDto,
  ) {
    return await this.commentService.update(id, comment);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.commentService.delete(id, user);
  }

  @Get('post/:postId')
  async readByPostId(@Param('postId', ParseIntPipe) id: number) {
    return await this.commentService.readByPostId(id);
  }

  @Get('user/:userId')
  async readByUserId(@Param('userId', ParseIntPipe) id: number) {
    return await this.commentService.readByUserId(id);
  }
}
