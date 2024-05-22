import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoginAuthDto } from '../../dto/auth/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body(ValidationPipe) loginAuthDto: LoginAuthDto) {
    const user = await this.authService.validateUser(loginAuthDto.username, loginAuthDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
