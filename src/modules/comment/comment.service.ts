import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(postId: number, user: User, comment: CommentDto) {
    return await this.commentRepository.save({
      ...comment,
      post: { id: postId },
      user,
    });
  }

  async update(id: number, comment: CommentDto) {
    return await this.commentRepository.update(id, comment);
  }

  /**
   * 1.验证身份
   * 2.判断评论的用户是否为当前用户，是，删除；不是，throw没有权限
   * @param id
   */
  async delete(id: number, user: User) {
    const comment = await this.commentRepository.findOne(id, {
      relations: ['user'],
    });
    if (comment.user.id === user.id) {
      return await this.commentRepository.delete(id);
    } else {
      throw new ForbiddenException();
    }
  }
}
