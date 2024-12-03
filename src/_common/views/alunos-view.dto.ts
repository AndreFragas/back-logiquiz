import { Aluno } from "../entities/alunos.entity";
import { BaseView } from "./base-view.dto";
import { UsuarioViewDto } from "./usuario-view.dto";

export class AlunosViewDto extends BaseView {
    toEntity(aluno: Aluno): AlunosViewDto {
        this.id = aluno.id;
        this.nome = aluno.nome;
        this.email = aluno.email;
        this.usuario_id = aluno.usuario_id;
        this.usuario = aluno.usuario ? new UsuarioViewDto().toEntity(aluno.usuario) : undefined;
        this.removeNull();
        return this;
    }

    id: number;
    nome: string;
    email: string;
    usuario_id: number;
    usuario: UsuarioViewDto;
}