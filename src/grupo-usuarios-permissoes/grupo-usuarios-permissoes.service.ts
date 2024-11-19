import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GrupoUsuariosPermissoes } from "src/_common/entities/grupo-usuarios-permissoes.entity";

@Injectable()
export class GrupoUsuariosPermissoesService {
    constructor(
        @InjectRepository(GrupoUsuariosPermissoes)
        private readonly grupoUsuariosPermissoesRepository: Repository<GrupoUsuariosPermissoes>
    ) {}

    async getGrupoPermissoes(grupo_usuario_id: number): Promise<GrupoUsuariosPermissoes[]>{
        return await this.grupoUsuariosPermissoesRepository.find({ where: { ativo: true, grupo_usuario_id: grupo_usuario_id }})
    } 

    async remove(gruposUsuariosPermissoes: GrupoUsuariosPermissoes[]) {
        await this.grupoUsuariosPermissoesRepository.remove(gruposUsuariosPermissoes);
    }

    async create(grupoUsuariosPermissoes: GrupoUsuariosPermissoes[]) {
        const novosGrupos = this.grupoUsuariosPermissoesRepository.create(grupoUsuariosPermissoes);
        await this.grupoUsuariosPermissoesRepository.save(novosGrupos);
    }
}