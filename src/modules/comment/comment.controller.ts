import {
  Controller,
  UseGuards,
  Post,
  Param,
  ParseIntPipe,
  Body,
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
}
