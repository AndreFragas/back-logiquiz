import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Fase } from 'src/_common/entities/fases.entity';
import { FasesCreateDto } from 'src/_common/dtos/fases-create.dto';
import { FasesUpdateDto } from 'src/_common/dtos/fases-update.dto';
import { PerguntasFaseService } from 'src/perguntas-fase/perguntas-fase.service';
import { PerguntasFaseCreateDto } from 'src/_common/dtos/perguntas-fase-create.dto';

@Injectable()
export class FasesService {
    constructor(
        @InjectRepository(Fase)
        private readonly fasesRepository: Repository<Fase>,
        private readonly perguntasFaseService: PerguntasFaseService
    ) {}

    async create(dto: FasesCreateDto[]) {
        for(const fase of dto) {
            let faseCreate = this.fasesRepository.create({ jogo_id: fase.jogo_id, numero: fase.numero});
            await this.fasesRepository.save(faseCreate);
            let perguntasFase: PerguntasFaseCreateDto[] = [];
            for (const id of fase.perguntas_ids) {
                perguntasFase.push({
                    fase_id: faseCreate.id,
                    pergunta_id: id
                });
            } 
            await this.perguntasFaseService.create(perguntasFase);
        }
    }
}