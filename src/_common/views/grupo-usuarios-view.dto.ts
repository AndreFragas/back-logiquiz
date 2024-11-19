import { BaseView } from "./base-view.dto";
import { GrupoUsuarios } from "../entities/grupo-usuarios.entity";

export class GrupoUsuariosViewDto extends BaseView {
    toEntity(grupo_usuario: GrupoUsuarios): GrupoUsuariosViewDto {
        this.id = grupo_usuario.id;
        this.nome = grupo_usuario.nome;
        this.ativo = grupo_usuario.ativo;
        this.removeNull();
        return this;
    }

    id: number;
    nome: string;
    ativo: boolean;
}