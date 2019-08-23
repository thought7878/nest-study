import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const { name, password } = data;
    const entity = await this.userService.findByName(name, true);
    if (!entity) {
      throw new UnauthorizedException('用户名错误！请重新输入用户名！');
    }
    if (!(await entity.comparePassword(password))) {
      throw new UnauthorizedException('密码错误！请重新输入密码！');
    }
    const { id } = entity;
    const payload = { id, name };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
    };
  }

  signToken(data: PayloadInterface) {
    return this.jwtService.sign(data);
  }
}
