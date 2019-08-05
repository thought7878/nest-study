import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  async test() {
    return { msg: 'ok' };
  }
}
