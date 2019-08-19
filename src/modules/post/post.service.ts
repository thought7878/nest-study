import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async insert(data: PostDto, user: User) {
    const entity = this.postRepository.create(data);
    await this.postRepository.save({ ...entity, user });
    return entity;
  }

  async find(categories: string[]) {
    // return await this.postRepository.find({ relations: ['user', 'category'] });
    // 'post':alias of table post in sql
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    // 'post.user':The first argument is the relation you want to load
    // 'user':alias of table user in sql, the second argument is an alias you assign to this relation's table.
    queryBuilder.leftJoinAndSelect('post.user', 'user');
    queryBuilder.leftJoinAndSelect('post.category', 'category');
    if (categories && categories.length > 0) {
      queryBuilder.where('category.alias IN (:...categories)', { categories });
    }
    const entities = await queryBuilder.getMany();
    return entities;
  }

  async findById(id: string) {
    const post = await this.postRepository.findOne(id);
    return post;
  }

  async update(id: string, data: Partial<PostDto>) {
    const result = await this.postRepository.update(id, data);
    return result;
  }
  async delete(id: string) {
    const result = await this.postRepository.delete(id);
    return result;
  }

  async vote(id: number, user: User) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(User, 'collectedPosts')
      .of(user)
      .add(id);
  }
  async unVote(id: number, user: User) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(User, 'collectedPosts')
      .of(user)
      .remove({ id });
  }

  async readCollectedUsers(id: number) {
    // return await this.postRepository.findOne(id, {
    //   relations: ['collectedUsers'],
    // });
    return await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'collectedUsers')
      .of(id)
      .loadMany();
  }
}
