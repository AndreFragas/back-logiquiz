import { Alternativa } from "../entities/alternativas.entity";
import { BaseView } from "./base-view.dto";

export class AlternativasViewDto extends BaseView {
    toEntity(alternativa: Alternativa): AlternativasViewDto { 
        this.id = alternativa.id;
        this.pergunta_id = alternativa.pergunta_id;
        this.texto = alternativa.texto;
        this.correta = alternativa.correta;
        this.removeNull;
        return this;
    }

    id: number;
    pergunta_id: number;
    texto: string;
    correta: boolean;
}