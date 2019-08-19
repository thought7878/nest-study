import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(data: TagDto) {
    return await this.tagRepository.save(data);
  }
  async delete(id: number) {
    return await this.tagRepository.delete(id);
  }
  async update(id: number, data: TagDto) {
    return await this.tagRepository.update(id, data);
  }
  async readAll() {
    return await this.tagRepository.find();
  }
}
