import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { PayloadInterface } from '../payload.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'asdfjkl;',
    });
  }

  async validate(payload: PayloadInterface, done: VerifiedCallback) {
    console.log('payload:', payload);
    const { name } = payload;
    const entity = await this.userService.findByName(name);
    if (!entity) {
      //   done(new UnauthorizedException('没找到用户！'));
      throw new UnauthorizedException('没找到用户！');
    }
    // done(null, entity);
    return entity;
  }
}
