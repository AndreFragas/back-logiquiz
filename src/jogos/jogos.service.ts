import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Jogo } from 'src/_common/entities/jogos.entity';
import { JogosCreateDto } from 'src/_common/dtos/jogos-create.dto';
import { FasesService } from 'src/fases/fases.service';
import { FasesCreateDto } from 'src/_common/dtos/fases-create.dto';
import { JogosViewDto } from 'src/_common/views/jogos-view.dto';
import { SalvarRespostasJogoDto } from 'src/_common/dtos/salvar-respostas-jogo.dto';
import { AlunosService } from 'src/alunos/alunos.service';
import { RespostasAlunosCreateDto } from 'src/_common/dtos/respostas-alunos-create.dto';
import { RespostasAlunosService } from 'src/respostas-alunos/respostas-alunos.service';

@Injectable()
export class JogosService {
    constructor(
        @InjectRepository(Jogo)
        private readonly jogosRepository: Repository<Jogo>,
        private readonly fasesService: FasesService,
        private readonly alunosService: AlunosService,
        private readonly respostasAlunosService: RespostasAlunosService
    ) {}

    async create(dto: JogosCreateDto) {
        const jogo = this.jogosRepository.create({
            professor_id: dto.professor_id,
            dificuldade: dto.dificuldade,
            nome: dto.nome,
            descricao: dto.descricao
        });
        await this.jogosRepository.save(jogo);
        let fases: FasesCreateDto[] = [];
        fases.push({ 
            jogo_id: jogo.id,
            numero: 1,
            perguntas_ids: dto.fase1
        })
        fases.push({ 
            jogo_id: jogo.id,
            numero: 2,
            perguntas_ids: dto.fase2
        })
        fases.push({ 
            jogo_id: jogo.id,
            numero: 3,
            perguntas_ids: dto.fase3
        })
        await this.fasesService.create(fases);
    }

    async findAll() {
        const jogos = await this.jogosRepository.find({
            relations: {
                professor: true, 
            }
        })

        if (!jogos) throw new NotFoundException(`Não foi possível encontrar jogos`);
        return jogos.map((x) => new JogosViewDto().toEntity(x));
    }

    async findOne(id: number) {
        const jogo = await this.jogosRepository.findOne({
            where: { id },
            relations: {
                professor: true, 
                fases: { 
                    perguntas: { 
                        pergunta: { 
                            alternativas: true
                        }
                    }
                }
            }
        })

        if (!jogo) throw new NotFoundException(`Não foi possível encontrar jogo com o id ${id}`);
        return new JogosViewDto().toEntity(jogo);
    }

    
    async salvarResposta(dto: SalvarRespostasJogoDto) {
        let aluno = await this.alunosService.findOneByUserId(dto.usuario_id);
        let respostas: RespostasAlunosCreateDto[] = [];
        for (const resposta of dto.respostas) {
            respostas.push({
                aluno_id: aluno.id,
                jogo_id: dto.jogo_id,
                alternativa_id: resposta.alternativa_id,
                fase_id: resposta.fase_id,
                pergunta_id: resposta.pergunta_id
            })
        }
        await this.respostasAlunosService.create(respostas);
    }
}