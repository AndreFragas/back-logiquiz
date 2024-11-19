import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/_common/dtos/login.dto';
import { SessoesService } from 'src/sessoes/sessoes.service';
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessaoesService: SessoesService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new UnauthorizedException();
    }
    const session = await this.sessaoesService.verifyUserHaveSession(user.id);
    return this.authService.login(user, session);
  }
}