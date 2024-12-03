import { Jogo } from "../entities/jogos.entity";
import { Usuario } from "../entities/usuario.entity";
import { BaseView } from "./base-view.dto";
import { FasesViewDto } from "./fases-view.dto";
import { UsuarioViewDto } from "./usuario-view.dto";

export class JogosViewDto extends BaseView {
    toEntity(jogo: Jogo): JogosViewDto {
        this.id = jogo.id;
        this.nome = jogo.nome;
        this.descricao = jogo.descricao;
        this.dificuldade = jogo.dificuldade;
        this.professor_id = jogo.professor_id;
        this.professor = jogo.professor ? new UsuarioViewDto().toEntity(jogo.professor) : undefined;
        this.fases = jogo.fases ? jogo.fases.map((x) => new FasesViewDto().toEntity(x)) : undefined;
        this.removeNull();
        return this;
    }

    id: number;
    nome: string;
    descricao: string;
    dificuldade: number;
    professor_id: number;
    professor: UsuarioViewDto;
    fases: FasesViewDto[];
}