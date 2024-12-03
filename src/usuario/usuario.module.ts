import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { SessoesModule } from 'src/sessoes/sessoes.module';
import { Usuario } from 'src/_common/entities/usuario.entity';
import { AlunosModule } from 'src/alunos/alunos.module';

@Module({
  controllers: [UsuarioController],
  imports: [TypeOrmModule.forFeature([Usuario]), SessoesModule, AlunosModule],
  providers: [UsuarioService, JwtService, SessionGuard],
  exports: [UsuarioService],
})
export class UsuarioModule {}
