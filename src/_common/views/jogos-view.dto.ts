import { Jogo } from "../entities/jogos.entity";
import { BaseView } from "./base-view.dto";

export class JogosViewDto extends BaseView {
    toEntity(jogo: Jogo): JogosViewDto {
        this.removeNull();
        return this;
    }
}