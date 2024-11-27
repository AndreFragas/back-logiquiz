import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Jogo } from 'src/_common/entities/jogos.entity';
import { JogosUpdateDto } from 'src/_common/dtos/jogos-update.dto';
import { JogosCreateDto } from 'src/_common/dtos/jogos-create.dto';

@Injectable()
export class JogosService {
    constructor(
        @InjectRepository(Jogo)
        private readonly jogosRepository: Repository<Jogo>
    ) {}

    async create(dto: JogosCreateDto) {
        
    }

    async findAll() {
        
    }

    async findOne(id: number) {
        
    }

    async update(id: number, dto: JogosUpdateDto) {
        
    }

    async remove(id: number) {
        
    }
}