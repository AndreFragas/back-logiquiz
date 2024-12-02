import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Alternativa } from 'src/_common/entities/alternativas.entity';
import { AlternativasCreateDto } from 'src/_common/dtos/alternativas-create.dto';
import { AlternativasUpdateDto } from 'src/_common/dtos/alternativas-update.dto';
import { AlternativasViewDto } from 'src/_common/views/alternativas-view.dto';
import { AutoDataPlanner } from 'src/utils/auto-data-planner';

@Injectable()
export class AlternativasService {
    constructor(
        @InjectRepository(Alternativa)
        private readonly alternativasRepository: Repository<Alternativa>
    ) {}

    async create(dto: AlternativasCreateDto[], pergunta_id: number) {
        const alternativas: Alternativa[] = [];
        for (let alternativa of dto) {
            let alternativaCriada = this.alternativasRepository.create({ ...alternativa, pergunta_id });
            alternativas.push(alternativaCriada);
        }
        await this.alternativasRepository.save(alternativas);
    }

    async findAll() {
        const alternativas = await this.alternativasRepository.find();
        if (!alternativas) throw new NotFoundException(`Não foi possível encontrar alternativas`); 
        return alternativas.map((x) => new AlternativasViewDto().toEntity(x));
    }

    async findOne(id: number) {
        const alternativa = await this.alternativasRepository.findOne({ where: { id: id }});
        if (!alternativa) throw new NotFoundException(`Não foi possível encontrar a alternativa do id ${id}`); 
        return new AlternativasViewDto().toEntity(alternativa);
    }

    async update(dto: AlternativasUpdateDto[]) {
        const alternativas = await this.alternativasRepository.find({ where: { id: In(dto.map((x) => x.id))}});
        const idsExistentes = alternativas.map((alt) => alt.id);
        const alternativasParaEditar = dto.filter((x) => idsExistentes.includes(x.id));
        const alternativasParaCriar = dto.filter((x) => !x.id || !idsExistentes.includes(x.id));
        if (alternativasParaCriar.length > 0) {
            let alternativasCriadas: Alternativa[] = [];
            for (let alternativa of alternativasParaCriar) {
                delete alternativa.id;
                alternativasCriadas.push(this.alternativasRepository.create(alternativa));
            }
            await this.alternativasRepository.save(alternativasCriadas);
        }
        await this.alternativasRepository.save(alternativasParaEditar);
    }

    async remove(id: number) {
        const alternativa = await this.alternativasRepository.findOne({ where: { id: id}});
        if (!alternativa) throw new NotFoundException(`Não foi possível encontrar a alternativa do id ${id}`); 
        await this.alternativasRepository.remove(alternativa);
    }

    async removeMultiplas(ids: number[]) {
        const alternativas = await this.alternativasRepository.find({ where: { id: In(ids)}});
        if (!alternativas) throw new NotFoundException(`Não foi possível encontrar alternativas`); 
        await this.alternativasRepository.remove(alternativas);
    }
}