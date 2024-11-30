import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PerguntasCreateDto } from 'src/_common/dtos/perguntas-create.dto';
import { PerguntasUpdateDto } from 'src/_common/dtos/perguntas-update.dto';
import { Pergunta } from 'src/_common/entities/perguntas.entity';
import { AlternativasService } from 'src/alternativas/alternativas.service';
import { PerguntasViewDto } from 'src/_common/views/perguntas-view.dto';
import {
    PaginateUtils,
    ResponsePaginateUtils,
  } from '@farmafacil-web/prismafive/utils';
import { PaginationParams } from '@farmafacil-web/prismafive/dtos';

@Injectable()
export class PerguntasService {
    constructor(
        @InjectRepository(Pergunta)
        private readonly perguntasRepository: Repository<Pergunta>,
        private readonly alternativasService: AlternativasService,
    ) {}

    async create(dto: PerguntasCreateDto) {
        const pergunta = this.perguntasRepository.create({ texto: dto.texto, dificuldade: dto.dificuldade });
        await this.perguntasRepository.save(pergunta);
        await this.alternativasService.create(dto.alternativas, pergunta.id);
    }

    async findAll() {
        const perguntas = await this.perguntasRepository.find({ relations: { alternativas: true }});
        if (!perguntas) throw new NotFoundException(`Não foi possível encontrar perguntas`);
        return perguntas.map((x) => new PerguntasViewDto().toEntity(x))
    }

    async findOne(id: number) {
        const pergunta = await this.perguntasRepository.findOne({ where: { id }, relations: { alternativas: true }})
        if (!pergunta) throw new NotFoundException(`Não foi possível encontrar uma pergunta com o id ${id}`);
        return new PerguntasViewDto().toEntity(pergunta);
    }

    async update(id: number, dto: PerguntasUpdateDto) {
        
    }

    async remove(id: number) {
        const pergunta = await this.perguntasRepository.findOne({ where: { id }, relations: { alternativas: true }})
        if (!pergunta) throw new NotFoundException(`Não foi possível encontrar uma pergunta com o id ${id}`);
        if (pergunta.alternativas) await this.alternativasService.removeMultiplas(pergunta.alternativas.map((x) => x.id));
        await this.perguntasRepository.delete(pergunta);
    }
}