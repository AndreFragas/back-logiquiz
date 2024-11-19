
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/_common/entities/usuario.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuarioService: UsuarioService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(usuario: Usuario) {
    const user = await this.usuarioService.findOneByEmail(usuario.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return user;
  }
}