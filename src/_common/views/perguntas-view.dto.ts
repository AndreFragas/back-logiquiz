import { Pergunta } from "../entities/perguntas.entity";
import { BaseView } from "./base-view.dto";

export class PerguntasViewDto extends BaseView {
    toEntity(pergunta: Pergunta): PerguntasViewDto {
        this.removeNull();
        return this;
    }
}