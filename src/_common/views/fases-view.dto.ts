import { Fase } from "../entities/fases.entity";
import { BaseView } from "./base-view.dto";
import { PerguntasFaseViewDto } from "./perguntas-fase.view.dto";
import { PerguntasViewDto } from "./perguntas-view.dto";

export class FasesViewDto extends BaseView {
    toEntity(fase: Fase): FasesViewDto {
        this.id = fase.id;
        this.numero = fase.numero;
        this.jogo_id = fase.jogo_id;
        this.perguntas = fase.perguntas ? fase.perguntas.map((x) => new PerguntasFaseViewDto().toEntity(x)) : undefined;
        this.removeNull();
        return this;
    }

    id: number;
    numero: number;
    jogo_id: number;
    perguntas: PerguntasFaseViewDto[];
}