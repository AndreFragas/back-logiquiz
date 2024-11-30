import { Pergunta } from "../entities/perguntas.entity";
import { AlternativasViewDto } from "./alternativas-view.dto";
import { BaseView } from "./base-view.dto";

export class PerguntasViewDto extends BaseView {
    toEntity(pergunta: Pergunta): PerguntasViewDto {
        this.id = pergunta.id;
        this.texto = pergunta.texto;
        this.dificuldade = pergunta.dificuldade;
        this.ativo = pergunta.ativo;
        this.alternativas = pergunta.alternativas ? pergunta.alternativas.map((x) => new AlternativasViewDto().toEntity(x)) : null;
        this.removeNull();
        return this;
    }

    id: number;
    texto: string;
    dificuldade: number;
    ativo: boolean;
    alternativas: AlternativasViewDto[];
}