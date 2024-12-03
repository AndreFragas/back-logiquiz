import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Aluno } from 'src/_common/entities/alunos.entity';
import { AlunosCreateDto } from 'src/_common/dtos/alunos-create.dto';
import { AlunosViewDto } from 'src/_common/views/alunos-view.dto';

@Injectable()
export class AlunosService {
    constructor(
        @InjectRepository(Aluno)
        private readonly alunosRepository: Repository<Aluno>
    ) {}

    async create(dto: AlunosCreateDto) {
        let aluno = this.alunosRepository.create(dto);
        await this.alunosRepository.save(aluno);
    }

    async findAll() {
        let alunos = await this.alunosRepository.find({ relations: { usuario: true}});
        if (!alunos)  throw new NotFoundException(`Não foi possível encontrar alunos`);
        return alunos.map((x) => new AlunosViewDto().toEntity(x))
    }

    async findOne(id: number) {
        let aluno = await this.alunosRepository.findOne({ where: { id }, relations: { usuario: true}});
        if (!aluno)  throw new NotFoundException(`Não foi possível encontrar o aluno com o id ${id}`);
        return new AlunosViewDto().toEntity(aluno);
    }

    async findOneByUserId(id: number) {
        let aluno = await this.alunosRepository.findOne({ where: { usuario_id: id }, relations: { usuario: true}});
        if (!aluno)  throw new NotFoundException(`Não foi possível encontrar o aluno com o id ${id}`);
        return new AlunosViewDto().toEntity(aluno);
    }
}