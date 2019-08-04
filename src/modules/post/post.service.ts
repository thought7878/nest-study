import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async insert(data) {
    const entity = this.postRepository.create(data);
    await this.postRepository.save(entity);
    return entity;
  }

  async find() {
    return await this.postRepository.find();
  }

  async findById(id: string) {
    const post = await this.postRepository.findOne(id);
    return post;
  }

  async update(id: string, data) {
    const result = await this.postRepository.update(id, data);
    return result;
  }
  async delete(id: string) {
    const result = await this.postRepository.delete(id);
    return result;
  }
}
