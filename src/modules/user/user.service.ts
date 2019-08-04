import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: UserDto) {
    const { name } = data;
    const user = await this.userRepository.findOne({ name });
    if (user) {
      throw new BadRequestException('用户名已存在！');
    }
    const entity = this.userRepository.create(data);
    await this.userRepository.save(entity);
    return entity;
  }
  async findById(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('没找到用户！');
    }
    return user;
  }
}
