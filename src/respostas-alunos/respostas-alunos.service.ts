import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RespostasAlunosCreateDto } from 'src/_common/dtos/respostas-alunos-create.dto';
import { RespostaAluno } from 'src/_common/entities/respostas-alunos.entity';

@Injectable()
export class RespostasAlunosService {
    constructor(
        @InjectRepository(RespostaAluno)
        private readonly respostaAlunoRepository: Repository<RespostaAluno>
    ) {}

    async create(dto: RespostasAlunosCreateDto[]) {
        for (const resposta of dto) {
            let respostaAlunoCreate = this.respostaAlunoRepository.create(resposta);
            await this.respostaAlunoRepository.save(respostaAlunoCreate);
        }
    }
}