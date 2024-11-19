import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioService } from "src/usuario/usuario.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { GrupoUsuarios } from "src/_common/entities/grupo-usuarios.entity";
import { GrupoUsuarioUpdateDto } from "src/_common/dtos/grupo-usuarios-update.dto";
import { GrupoUsuariosCreateDto } from "src/_common/dtos/grupo-usuarios-create.dto";
import { GrupoUsuariosPermissoes } from "src/_common/entities/grupo-usuarios-permissoes.entity";
import { GrupoUsuariosPermissoesService } from "src/grupo-usuarios-permissoes/grupo-usuarios-permissoes.service";

@Injectable()
export class GrupoUsuariosService {
    constructor(
        @InjectRepository(GrupoUsuarios)
        private readonly grupoUsuariosRepository: Repository<GrupoUsuarios>,
        private readonly grupoUsuariosPermissoesService: GrupoUsuariosPermissoesService,
        private readonly usuariosServices: UsuarioService
    ) {}

    async findAll() {
        return await this.grupoUsuariosRepository.find({ 
            where: { ativo: true },
            relations: { usuarios: true, grupo_usuario_permissoes: { permissao: true } }
        })
    }

    async create(grupoUsuarioDto: GrupoUsuariosCreateDto) {
        let grupo_usuario = await this.grupoUsuariosRepository.findOne({ where: { nome: grupoUsuarioDto.nome } });
        if (grupo_usuario) new NotFoundException('errors.api.groupAlreadyExists');
        const novoGrupoUsuario = this.grupoUsuariosRepository.create(grupoUsuarioDto);
        const bancoGrupoUsuario = await this.grupoUsuariosRepository.save(novoGrupoUsuario);
        return bancoGrupoUsuario;
    }

    async update(id: number, grupoUsuarioDto: GrupoUsuarioUpdateDto) {
        const grupo_usuario = await this.grupoUsuariosRepository.findOne({
            where: { id: id },
            relations: { grupo_usuario_permissoes: true },
        });
        if (!grupo_usuario) new NotFoundException('errors.api.groupAlreadyExists');

        if (grupo_usuario.grupo_usuario_permissoes && grupo_usuario.grupo_usuario_permissoes.length > 0) {
            const permissões = grupo_usuario.grupo_usuario_permissoes;
    
            await this.grupoUsuariosPermissoesService.remove(permissões)
        }

        let newGrupoUsuarioPermissoes: GrupoUsuariosPermissoes[] = [];
      if (grupoUsuarioDto.grupo_usuario_permissoes) {
        for (const permissao of grupoUsuarioDto.grupo_usuario_permissoes) {
          const newPermissao = {
            permissao_id: permissao.permissao_id,
            read: permissao.read,
            create: permissao.create,
            edit: permissao.edit,
            delete: permissao.delete,
            grupo_usuario_id: id,
            filial_id: permissao.filial_id,
          } as GrupoUsuariosPermissoes;
          newGrupoUsuarioPermissoes.push(newPermissao);
        }

        await this.grupoUsuariosPermissoesService.create(newGrupoUsuarioPermissoes);
      }

        delete grupoUsuarioDto.grupo_usuario_permissoes;
        const updatedGroup = await this.grupoUsuariosRepository.save(grupoUsuarioDto);
        updatedGroup.grupo_usuario_permissoes = newGrupoUsuarioPermissoes;
        return updatedGroup;
    }

    async remove(id: number) {
        const gruposUsuario = await this.grupoUsuariosRepository.findOne({
            where: { id: id },
            relations: { grupo_usuario_permissoes: true, usuarios: true },
        });
        if (!gruposUsuario) new NotFoundException('errors.api.groupAlreadyExists');
    
        if (gruposUsuario.usuarios && gruposUsuario.usuarios.length > 0) {
            await this.usuariosServices.removeGroups(gruposUsuario.usuarios)
        }
    
        if (gruposUsuario.grupo_usuario_permissoes && gruposUsuario.grupo_usuario_permissoes.length > 0) {
            await this.grupoUsuariosPermissoesService.remove(gruposUsuario.grupo_usuario_permissoes);
        }
    
        await this.grupoUsuariosRepository.remove(gruposUsuario);
    }
}