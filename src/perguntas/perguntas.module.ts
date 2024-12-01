import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionGuard } from 'src/jwt/jwt-session-guard';
import { SessoesModule } from 'src/sessoes/sessoes.module';
import { Pergunta } from 'src/_common/entities/perguntas.entity';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { AlternativasModule } from 'src/alternativas/alternativas.module';

@Module({
  controllers: [PerguntasController],
  imports: [TypeOrmModule.forFeature([Pergunta]), SessoesModule, AlternativasModule],
  providers: [PerguntasService],
  exports: [PerguntasService],
})
export class PerguntasModule {}
