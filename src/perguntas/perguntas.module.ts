import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessoesModule } from 'src/sessoes/sessoes.module';
import { Pergunta } from 'src/_common/entities/perguntas.entity';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { AlternativasModule } from 'src/alternativas/alternativas.module';
import { PerguntasFaseModule } from 'src/perguntas-fase/perguntas-fase.module';

@Module({
  controllers: [PerguntasController],
  imports: [TypeOrmModule.forFeature([Pergunta]), SessoesModule, AlternativasModule, PerguntasFaseModule],
  providers: [PerguntasService],
  exports: [PerguntasService],
})
export class PerguntasModule {}
