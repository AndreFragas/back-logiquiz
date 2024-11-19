import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt/jwt-stategy';
import { AuthController } from './auth.controller';
import { ModuloModule } from 'src/modulo/modulo.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { SessoesModule } from 'src/sessoes/sessoes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from 'src/_common/entities/usuario.entity';
import { PermissoesModule } from 'src/permissoes/permissoes.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
    UsuarioModule,
    ModuloModule,
    PermissoesModule,
    SessoesModule,
    TypeOrmModule.forFeature([Usuario])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}