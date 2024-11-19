import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Sessoes } from "src/_common/entities/sessoes.entity";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class SessoesService {
    constructor(
        @InjectRepository(Sessoes)
        private readonly sessoesRepository: Repository<Sessoes>
    ) {}

    async remove(usuario_id: number) {
        const sessao = await this.sessoesRepository.findOneBy({ usuario_id: usuario_id });
        if (!sessao) throw new NotFoundException('errors.api.notFound');
        await this.sessoesRepository.remove(sessao);
    }
    
    async findAll() {
        const sessions = await this.sessoesRepository.find({ relations: { usuario: true } });
        return sessions;
    }

    async verifyUserHaveSession(usuario_id: number) {
        const session = await this.sessoesRepository.findOne({ where: {  usuario_id: usuario_id } });
        return session ? true : false;
    }

    async create(usuario_id: number, token: string) {
        let novaSessao = this.sessoesRepository.create({
            token: token,
            usuario_id: usuario_id,
            data_criacao: new Date(),
            data_atualizacao: new Date(),
        });
        return await this.sessoesRepository.save(novaSessao);
    }

    async findOneByToken(token: any) {
        
        const session = await this.sessoesRepository.findOne({ where: { token: token } });
        return session ? true : false;
    }
}