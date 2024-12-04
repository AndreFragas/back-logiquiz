import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PerguntaFase } from 'src/_common/entities/pergunta-fase.entity';
import { PerguntasFaseCreateDto } from 'src/_common/dtos/perguntas-fase-create.dto';

@Injectable()
export class PerguntasFaseService {
    constructor(
        @InjectRepository(PerguntaFase)
        private readonly perguntasFaseRepository: Repository<PerguntaFase>
    ) {}

    async create(dto: PerguntasFaseCreateDto[]) {
        for (const perguntaFase of dto) {
            let perguntaFaseCreate = this.perguntasFaseRepository.create(perguntaFase);
            await this.perguntasFaseRepository.save(perguntaFaseCreate);
        }
    }

    async findByPerguntaId(id: number) {
        return await this.perguntasFaseRepository.find({ where: { pergunta_id: id}})
    }
}