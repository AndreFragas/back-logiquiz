import { BaseView } from "./base-view.dto";
import { Modulos } from "../entities/modulos.entity";

export class ModulosViewDto extends BaseView {
    toEntity(modulo: Modulos): ModulosViewDto {
        this.id = modulo.id;
        this.nome = modulo.nome;
        this.ativo = modulo.ativo;
        this.removeNull();
        return this;
    }

    id: number;
    nome: string;
    ativo: boolean;
}