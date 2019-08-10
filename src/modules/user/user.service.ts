import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto, UpdatePwdDto } from './user.dto';

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
    const user = await this.userRepository.findOne(id, {
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException('没找到用户！');
    }
    return user;
  }

  async updatePassword(id: string, passwords: UpdatePwdDto) {
    const { password, newPassword } = passwords;
    const entity = await this.userRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('用户不存在！');
    }
    const isSame = await entity.comparePassword(password);
    if (!isSame) {
      throw new BadRequestException('原密码不正确，请重新输入！');
    }
    entity.password = newPassword;
    return await this.userRepository.save(entity);
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({ name });
  }
}
