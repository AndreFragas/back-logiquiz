import { Injectable } from "@nestjs/common";
import { ModuloService } from "src/modulo/modulo.service";
import { PermissoesViewDto } from "src/_common/views/permissoes-view.dto";
import { GrupoUsuariosPermissoesService } from "src/grupo-usuarios-permissoes/grupo-usuarios-permissoes.service";

@Injectable()
export class PermissoesService {
    constructor(
        private readonly moduloService: ModuloService,
        private readonly gruposUsuarioPermissosService: GrupoUsuariosPermissoesService, 
    ) {}

    async getPermissoesPorGrupo(grupo_usuario_id: number): Promise<PermissoesViewDto[]> {
        const grupo_usuarios_permissoes = await this.gruposUsuarioPermissosService.getGrupoPermissoes(grupo_usuario_id);
        const permissoesModulos = await this.moduloService.getPermissoes();

        const permissoes = permissoesModulos.map((permissao) => {
            let perms: PermissoesViewDto[] = [];

            const grupo_permissao = grupo_usuarios_permissoes.filter((x) => x.permissao_id === permissao.id);
            for (const permissao_grupo of grupo_permissao) {
                let actions: string[] = [];
                if (permissao_grupo?.read || !grupo_usuario_id) actions.push('read');
                if (permissao_grupo?.create || !grupo_usuario_id) actions.push('create');
                if (permissao_grupo?.edit || !grupo_usuario_id) actions.push('edit');
                if (permissao_grupo?.delete || !grupo_usuario_id) actions.push('delete');
                perms.push(new PermissoesViewDto().toEntity(permissao, actions));
            }

            return perms;
        })
        return permissoes.flat(); 
    }

    async findAll() {
        return await this.moduloService.getPermissoes();
    }
}