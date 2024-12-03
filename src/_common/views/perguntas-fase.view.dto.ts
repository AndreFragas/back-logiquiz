import { PerguntaFase } from "../entities/pergunta-fase.entity";
import { BaseView } from "./base-view.dto";
import { PerguntasViewDto } from "./perguntas-view.dto";

export class PerguntasFaseViewDto extends BaseView {
    toEntity(perguntaFase: PerguntaFase): PerguntasFaseViewDto {
        this.id = perguntaFase.id;
        this.fase_id = perguntaFase.fase_id;
        this.pergunta_id = perguntaFase.pergunta_id;
        this.pergunta = perguntaFase.pergunta ? new PerguntasViewDto().toEntity(perguntaFase.pergunta) : undefined;
        this.removeNull();
        return this;
    }

    id: number; 
    fase_id: number;
    pergunta_id: number;
    pergunta: PerguntasViewDto;
}