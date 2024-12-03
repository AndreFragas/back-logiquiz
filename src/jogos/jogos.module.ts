import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from 'src/_common/entities/jogos.entity';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { SessoesModule } from 'src/sessoes/sessoes.module';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';
import { FasesModule } from 'src/fases/fases.module';
import { AlunosModule } from 'src/alunos/alunos.module';
import { RespostasAlunosModule } from 'src/respostas-alunos/respostas-alunos.module';

@Module({
  controllers: [JogosController],
  imports: [TypeOrmModule.forFeature([Jogo]), SessoesModule, FasesModule, AlunosModule, RespostasAlunosModule],
  providers: [JogosService, JwtService, SessionGuard],
  exports: [JogosService],
})
export class JogosModule {}
