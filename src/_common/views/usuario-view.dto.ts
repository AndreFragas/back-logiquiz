import { BaseView } from "./base-view.dto";
import { Usuario } from "../entities/usuario.entity";
import { GrupoUsuariosViewDto } from "./grupo-usuarios-view.dto";

export class UsuarioViewDto extends BaseView {
    toEntity(usuario: Usuario, sessao_id?: number): UsuarioViewDto {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.foto = usuario.foto;
        this.email = usuario.email;
        this.ativo = usuario.ativo;
        this.admin = usuario.admin;
        this.master = usuario.master;
        this.telefone = usuario.telefone;
        this.data_criacao = usuario.data_criacao;
        this.data_atualizacao = usuario.data_atualizacao;
        this.user_config = usuario.configuracao ? JSON.parse(usuario.configuracao) : undefined;
        this.grupo_usuario = usuario.grupo_usuarios ? new GrupoUsuariosViewDto().toEntity(usuario.grupo_usuarios) : undefined; 
        this.session_id = sessao_id ?? undefined;
        this.removeNull();
        return this;
    }

    id: number;
    nome: string;
    email: string;
    ativo: boolean;
    master: boolean;
    admin: boolean;
    telefone?: string;
    foto?: string;
    user_config?: string;
    data_criacao?: Date;
    data_atualizacao?: Date;
    grupo_usuario?: GrupoUsuariosViewDto;
    session_id?: number;
}