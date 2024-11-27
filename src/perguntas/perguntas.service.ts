import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PerguntasCreateDto } from 'src/_common/dtos/perguntas-create.dto';
import { PerguntasUpdateDto } from 'src/_common/dtos/perguntas-update.dto';
import { Pergunta } from 'src/_common/entities/perguntas.entity';

@Injectable()
export class PerguntasService {
    constructor(
        @InjectRepository(Pergunta)
        private readonly perguntasRepository: Repository<Pergunta>
    ) {}

    async create(dto: PerguntasCreateDto) {
    }

    async findAll() {
        
    }

    async findOne(id: number) {
        
    }

    async update(id: number, dto: PerguntasUpdateDto) {
        
    }

    async remove(id: number) {
        
    }
}